import { NextResponse } from "next/server";
import {prisma} from "@/services/db";
import { main } from "../route";
import { writeFile, unlink } from 'fs/promises';
import path from 'path';


export const GET = async (req: Request) => {
  try {
      const id = req.url.split("/blog/")[1];
      if (!id) {
      return NextResponse.json(
      { message: "ID is required in the URL" }, 
      { status: 400 } 
    );
  }

    await main();

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving post", error: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  try {
    const id = new URL(req.url).pathname.split("/blog/")[1];

    const formData = await req.formData();
   
    if (!id) {
      return NextResponse.json(
        { message: "ID is required in the URL" },
        { status: 400 }
      );
    }


    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const newImage = formData.get('image') as File | null;

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: "Title, description, and category are required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      title,
      description,
      category,
    };


    if (newImage) {

      if (existingPost.imageUrl) {
        try {
          const oldImagePath = existingPost.imageUrl.split('/uploads/')[1];
          await unlink(path.join(process.cwd(), 'public', 'uploads', oldImagePath));
        } catch (error) {
          console.error("Erreur lors de la suppression de l'ancienne image:", error);
        }
      }

      const buffer = Buffer.from(await newImage.arrayBuffer());
      const filename = `${Date.now()}-${newImage.name}`;
      const imagePath = path.join(process.cwd(), 'public', 'uploads', filename);
      
      await writeFile(imagePath, buffer);
      updateData.imageUrl = `/uploads/${filename}`;
    }

    await main();

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { message: "Error updating post", error: error},
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("/blog/")[1];
    if (!id) {
      return NextResponse.json(
        { message: "ID is required in the URL" },
        { status: 400 }
      );
    }

    await main();

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    if (post.imageUrl) {
      try {
        const imagePath = post.imageUrl.split('/uploads/')[1];
        if (imagePath) {
          await unlink(path.join(process.cwd(), 'public', 'uploads', imagePath));
          console.log(`Image supprimée : ${imagePath}`);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
      }
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post and associated image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    return NextResponse.json(
      { message: "Error deleting post", error: JSON.stringify(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

