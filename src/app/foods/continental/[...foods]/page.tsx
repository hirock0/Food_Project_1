import Back_Forword from "@/components/backOrforword/backorforword";
export default function Continental_Foods(params: any) {
  const foodName = params.params?.foods || "";
  return (
    <main className=" h-screen bg-black text-white pt-10">
      <Back_Forword />
      <div className=" p-10">
        <h1 className=" text-center mt-5 underline underline-offset-4">
          This page under developing
        </h1>
        <p className=" mt-5">The developer in working in this page</p>
      </div>
    </main>
  );
}
