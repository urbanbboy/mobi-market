import { ReactNode } from "react";
import cls from "./DropdownMenu.module.scss";

interface DropdownMenuProps {
    children?: ReactNode
}

export const DropdownMenu = (props: DropdownMenuProps) => {
    const { children } = props
    
    return (
        <div className={cls.dropdownMenu}>
            {children}
        </div>
    );
};