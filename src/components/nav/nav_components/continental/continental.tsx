import Link from 'next/link'
import Style from './continental.module.css'

export default function Continantal(){
    return(

        <main className=" h-full w-full">
        <div id={Style.allLinkDiv} className=" w-full flex justify-center gap-10 max-sm:gap-4 h-full p-4 backdrop:filter backdrop-blur-3xl opacity-80">
                <ul className=" max-sm:w-full  h-full flex flex-col justify-between ">
                    <Link href={`/foods/continental/Asian`}><li className=" border">Asian</li></Link>
                    <Link href={`/foods/continental/North American`}><li className=" border">North American</li></Link>
                    <Link href={`/foods/continental/European`}><li className=" border">European</li></Link>
                    <Link href={`/foods/continental/Antarctican`}><li className=" border">Antarctican</li></Link>
                </ul>
                <ul className=" max-sm:w-full h-full flex flex-col justify-between ">
                    <Link href={`/foods/continental/South American`}><li className=" border">South American</li></Link>
                    <Link href={`/foods/continental/African`}><li className=" border">African</li></Link>
                    <Link href={`/foods/continental/Australia`}><li className=" border">Australian</li></Link>
                    <Link href={""}><li className=" border">Pizza</li></Link>
                </ul>
                <ul className="max-sm:w-full h-full flex flex-col justify-between ">
                    <Link href={""}><li className=" border">Pizza</li></Link>
                    <Link href={""}><li className=" border">Pizza</li></Link>
                    <Link href={""}><li className=" border">Pizza</li></Link>
                    <Link href={""}><li className=" border">Pizza</li></Link>
                </ul>
        </div>
    </main>








        // <main id={Style.main} className=' max-sm:text-xs flex flex-col justify-around h-full backdrop:filter backdrop-blur-3xl opacity-80'>
        //     <ul className=' flex justify-around'>
        //         <li><Link href={`/foods/continental/Asian`}>Asian</Link></li>
        //         <li><Link href={`/foods/continental/North American`}>North American</Link></li>
        //         <li><Link href={`/foods/continental/European`}>European</Link></li>
        //     </ul>
        //     <ul className=' flex justify-around'>
        //         <li><Link href={`/foods/continental/Antarctican`}>Antarctican</Link></li>
        //         <li><Link href={`/foods/continental/South American`}>South American</Link></li>
        //         <li><Link href={`/foods/continental/African`}>African</Link></li>
        //     </ul>
        //     <ul className=' flex justify-around'>
        //         <li><Link href={`/foods/continental/Australia`}>Australian</Link></li>
        //     </ul>
        // </main>
    )
}