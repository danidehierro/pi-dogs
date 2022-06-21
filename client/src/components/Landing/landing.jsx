import {Link} from 'react-router-dom';
import './landing.css'

export default function Landing(){
     return(
         <div className='landing'>

             <h1 className='titleland'> App Henry Dogs</h1>
             <h4> Created by Eric Briansó</h4>
             
             <Link to= '/home'>
                 <button className='botton'>Start</button>
             </Link>
         </div>
     )

}