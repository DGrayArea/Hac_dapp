
const Header = ({ name }) => {

  return (
    <header className='mb-3 mt-5'>
        <div className='text-center items-center mx-auto'>
            <h1 className='text-xl md:text-3xl text-white font-extrabold'>{name}</h1>
        </div>
     </header>
  )
}

export default Header