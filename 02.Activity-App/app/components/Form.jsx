import  { useEffect, useState } from "react";
import {app} from "../bdd/configFirebase";
import { db } from "../bdd/configFirebase";
import { doc, collection,setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, 
    ref, uploadBytes } from "firebase/storage";
import Toast from "./Toasts";
import { useRouter } from "next/navigation";

function Form() {
  const [inputs, setInputs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);


  const storage = getStorage(app);

  const router = useRouter()
  

  useEffect(()=>{
    if(submit==true)
    {
        savePost();
        router.push("/")
    }

  },[submit])
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(true);
    const storageRef = ref(storage, 'images/'+file?.name);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(resp=>{
        getDownloadURL(storageRef).then(async(url)=>{
            
            setInputs((values)=>({...values,
                image:url}));          
            setSubmit(true);

        }) 
      }) ;
  };

  const savePost = async () => {
    const docRef = doc(collection(db, "posts"));
    await setDoc(docRef, inputs);
    await setDoc(docRef, inputs);
  }
  
  return (
    <div className="mt-4">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post créer avec succes"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <textarea
          name="desc"
          className="w-full mb-4 
        outline-blue-400 border-[1px] 
        p-2 rounded-md"
          required
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="text"
          name="session"
          placeholder="Date de session"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Ville"
          name="lieu"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
        <button
          type="submit"
          className="bg-[#ff6030] w-full p-1 
rounded-md text-white"
        >
          Créer post
        </button>
      </form>
    </div>
  );
}

export default Form;