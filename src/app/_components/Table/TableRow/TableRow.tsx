import type ItemOption from "@/utils/genericTypes";
import type KeyValueArray from "@/utils/genericTypes";
import {Button, Grid, Typography} from "@mui/material";
//import { ButtonRedirect } from "../../Buttons/ButtonRedirect/ButtonRedirect";
export interface TableRowProps {
    columns : ItemOption[],
    itemRedirect : string
}

export const TableRow = ({ columns, itemRedirect}:TableRowProps) => {
    return <Grid container> 
        {columns.map((column)=>(
            <Grid>
                    <Typography>
                        {column.key}
                    </Typography>
                    <Typography>
                        {column.value}
                    </Typography>
            </Grid>
        ))}
        {/* <ButtonRedirect
            id={itemRedirect}>Alterar</ButtonRedirect> */}
    </Grid>
}