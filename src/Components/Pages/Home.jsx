import { useEffect } from 'react'
import papierPeint from '../../assets/Papier.png'


const Home = () => {

  const style = {
    'backgroundImage' : `url(${papierPeint})`,
    'backgroundSize' : 'cover',
  }

  useEffect(() => {
    document.body.style.backgroundImage = style.backgroundImage
    document.body.style.backgroundSize = style.backgroundSize
    document.body.style.opacity = style.opacity

    return(() => {
      document.body.style.backgroundImage =''
      document.body.style.backgroundSize =''
      document.body.style.opacity =''
    })
  }, [])

    return <div >
      <section>
        <h1 className="text-center">Mande Home</h1>
      </section>
    </div>
}

export  default Home;