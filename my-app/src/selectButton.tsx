import { useState } from "react";
import { useTranslation } from "react-i18next";

interface btnProps {
    label: string;
    selected: boolean;
    onClick: () => void;

}


export const selectButton = ({label, ...ButtonProps}:btnProps ) => {
    const [selected, setSelected] = useState(true);
    const { t } = useTranslation();

    return (
        <button
        style={{background: selected ? "pink" : "green"}}
        onClick={() => {
            setSelected(!selected);
        ButtonProps
      }}
        > 
        {t(label)}
        </button>

    )


}