import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {

  return (

    props.suggestions.map((location , index)=>{
      return <div
      onClick={()=>{
      if (props.activeField == "pickup") {
        props.setPickUp(location.name)
      }else{
        props.setDestination(location.name);
      }
      }} 
      key={index} 
      className='flex items-center rounded-xl border cursor-pointer border-gray-300 active:border-black p-2 gap-2 justify-start mt-4 px-2 py-3 bg-gray-100'>

      <h2 className='w-10 h-10 bg-[#eee] flex items-center justify-center rounded-full'><i className="ri-map-pin-2-fill"></i></h2>

      <h4 className='font-semibold'>{location.name}</h4>

     </div>
    })
  )
}

export default LocationSearchPanel
