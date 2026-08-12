import type { ButtonProps } from "./Button.type";

const Button=({children, ...props}: ButtonProps)=>{
    return <button {...props}>{children}</button>
}


 
export default Button;