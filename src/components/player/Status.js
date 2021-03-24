import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Overlay, StatusContainer, Window, CloseButton } from './player.styles';
import { closeStatus } from './state/player.actions';
import 'react-tabs/style/react-tabs.css';
import { useDispatch } from 'react-redux';
import Attributes from './Attributes';
import Inventory from './Inventory';



const Status = () => {

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeStatus());
    };

    return (
        <>
            <Overlay />
            <StatusContainer>
                <Window>
                <CloseButton onClick={handleClose}>x</CloseButton>
                    <Tabs>
                        <TabList>
                            <Tab>Status</Tab>
                            <Tab>Inventory</Tab>
                        </TabList>

                        <TabPanel>
                            <Attributes />
                        </TabPanel>
                        <TabPanel>
                            <Inventory />
                        </TabPanel>
                    </Tabs>
                </Window>
            </StatusContainer>
        </>
    )
};

export default Status;