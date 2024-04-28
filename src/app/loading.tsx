import Style from './loader.module.css'
export default function Loading(){
    return(
        <main className=" h-screen flex items-center justify-center bg-black text-white">
           <div id={Style.loaderDiv} className=" border-cyan-100 h-16 w-16 rounded-full">

           </div>
        </main>
    )
}