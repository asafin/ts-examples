import React = require("react");
import { Typography } from "@material-ui/core";

const emptyAbonentsCallListMessage = () => {
    return 'Звонки не найдены, пожалуйста выполните звонок.'
}

const emptyAbonentsCallListWithFilterResultMessage = () => {
    return 'Звонки не найдены, пожалуйста, измените параметры поиска.'
}

const messageSubtitleWrapper = (message: string) => {
    return (
        <Typography align="center" variant="h6" style={{paddingTop: 30}}>
            {message}
        </Typography>
    )
}

export const getEmptyAbonentsCallListMessage = () => messageSubtitleWrapper(emptyAbonentsCallListMessage())

export const getEmptyAbonentsCallListWithFilterResultMessage = () => messageSubtitleWrapper(emptyAbonentsCallListWithFilterResultMessage())

export const getCustomMessage = (message: string) => messageSubtitleWrapper(message)