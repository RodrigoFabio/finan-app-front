// "use client";
// import { Button } from "@mui/material";
// import { useRouter, usePathname} from "next/navigation"; 


// export const ButtonRedirect = ({id, children}:{id: string, children: string}) =>{

//     const router = useRouter()
//     const pathname = usePathname()

//     const handleRedirect = () =>{
//         router.push(`${pathname}/${id}`)
//     }

//     return <Button
//      onClick={() => {handleRedirect();}}
//     >        
//         {children}
//     </Button>
// }