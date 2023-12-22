import loadergGif from  "../images/notes-loader.gif"


const Loader = () =>  {
    return (
    <div className="flex justify-center items-center w-full h-screen"> 
        <img src={loadergGif} alt="loader" />
    </div>
    )
}
export default Loader