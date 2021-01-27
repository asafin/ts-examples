import * as React from "react"
import { SearchInputTextComponent } from "../input/InputComponent"
import * as I from './ISearch'

export const SearchComponent : React.FC<I.Props> = props => {

    const [inputValue, setInputValue] = React.useState<string>('')

    const {dataIsLoading, description, search} = props

    const componentClass = "SearchComponent"

    const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)

    const searchInputListener = () => {
        search(inputValue)
    }

    const handleSearchKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            searchInputListener()
        }
    }

    return (
        <div className={componentClass} >
            <SearchInputTextComponent 
                listener={searchInputListener}
                value={inputValue}
                disabled={dataIsLoading}
                description={description}
                onChange={handleSearchFieldChange}
                showDescription={true}
                onKeyDown={handleSearchKeyDown}
            />
        </div>
    )
}
