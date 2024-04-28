import Side_Menu from "@/components/side_menu/side_menu";
import All_Pages from "./all_pages/page";


export default function Home(params:any){
  const searchdata = params?.searchParams || ""
  return(
    <main id="main" className=" h-screen ">
          <All_Pages searchdetails = {searchdata}/>
          <Side_Menu/>
    </main>
  )
}