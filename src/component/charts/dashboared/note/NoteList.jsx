function NoteList({noteData}) {
    return (
      <div className=" ">
       {
        <ul className="grid grid-cols-4 gap-4 grid-rows-[250px]">
        {noteData.map(data=> <li key={data.id} className="bg-red-500">{data.text}</li>)}
        </ul>
       } 

      </div>
    )
}

export default NoteList
