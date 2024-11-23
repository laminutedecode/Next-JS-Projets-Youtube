import Card from "./Card"

export default function GalerieSection(props:any) {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 p-3">
        {props.carList.map((car:any, index:number) => (
          <Card key={index} car={car} />
        ))}
    </div>
  )
}
