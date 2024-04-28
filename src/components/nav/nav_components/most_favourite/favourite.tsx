
import Link from "next/link"
import Style from './most.module.css'
export default function Most_Favourite(){
    return(
        <main className=" h-full w-full">
        <div id={Style.allLinkDiv} className=" w-full flex justify-center gap-10 max-sm:gap-4 h-full p-4 backdrop:filter backdrop-blur-3xl opacity-80">
                <ul className=" max-sm:w-full  h-full flex flex-col justify-between ">
                    <Link href={`/foods/most_favourite/Hyderabadi Pasinday`}><li className=" border">Hyderabadi Pasinday</li></Link>
                    <Link href={`/foods/most_favourite/Pizza`}><li className=" border">Pizza</li></Link>
                    <Link href={`/foods/most_favourite/Burger`}><li className=" border">Burger</li></Link>
                    <Link href={`/foods/most_favourite/Ramen`}><li className=" border">Ramen</li></Link>
                </ul>
                <ul className=" max-sm:w-full h-full flex flex-col justify-between ">
                    <Link href={`/foods/most_favourite/Paella`}><li className=" border">Paella</li></Link>
                    <Link href={`/foods/most_favourite/Pierogi`}><li className=" border">Pierogi</li></Link>
                    <Link href={`/foods/most_favourite/Moussaka`}><li className=" border">Moussaka</li></Link>
                    <Link href={`/foods/most_favourite/Boeuf Bourgignon`}><li className=" border">Boeuf Bourgignon</li></Link>
                </ul>
                <ul className="max-sm:w-full h-full flex flex-col justify-between ">
                    <Link href={`/foods/most_favourite/Tom Kha Gai`}><li className=" border">Tom Kha Gai</li></Link>
                    <Link href={`/foods/most_favourite/Eisbein`}><li className=" border">Eisbein</li></Link>
                    <Link href={`/foods/most_favourite/Chicken rice`}><li className=" border">Chicken rice</li></Link>
                    <Link href={`/foods/most_favourite/Poutine`}><li className=" border">Poutine</li></Link>
                </ul>
        </div>
    </main>
    )
}