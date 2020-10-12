import * as React from "react"
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import {PlayBackSpeed} from "../../pages/callsList/callItem/CallItemComponent";

interface Props {
    handlePlayBtnClick: () => void,
    setSelectedPlayBackSpeed: (index: PlayBackSpeed) => void,
    play: boolean,
    playBackSpeed: PlayBackSpeed,
    options: PlayBackSpeed []
}

const options = [1, 1.5, 2];

export const PlayerControlsComponent: React.FC<Props> = props => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);


    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        value: PlayBackSpeed
    ) => {
        props.setSelectedPlayBackSpeed(value);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen: boolean) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const setPlayIcon = () => {
        if (props.play) {
            return <PauseIcon color="primary" />;
        } else {
            return <PlayArrowIcon color="primary" />;
        }
    };

    return (
        <React.Fragment>
            <ButtonGroup
                aria-label="small outlined button group"
                size="small"
                variant="outlined"
            >
                <Button onClick={props.handlePlayBtnClick}>{setPlayIcon()}</Button>
                <Button >x{props.playBackSpeed}</Button>
                <Button onClick={handleToggle} ref={anchorRef}>
                    <ArrowDropDownIcon color="primary" />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{zIndex: 2}}
            >
                {({TransitionProps}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: "bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option: PlayBackSpeed) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === props.playBackSpeed}
                                            onClick={event => handleMenuItemClick(event, option)}
                                        >
                                            x{option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
