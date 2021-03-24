import { Line } from 'rc-progress';
import { useSelector } from 'react-redux';
import { StatusContent, TabContent, barProps } from './player.styles';

const getProgressPercentage = (max, curr) => {
    if (curr === 0) return 0;
    return curr / max * 100;
}

const Attributes = () => {
    const {
        name,
        level,
        title,
        strength,
        dexterity,
        inteligence,
        health,
        healthPoints,
        magicPoints,
        experience,
    } = useSelector(state => state.player);

    const [totalHp, currHp] = healthPoints;
    const [totalMp, currMp] = magicPoints;
    const [nextLevelXp, currXp] = experience;

    return (
        <TabContent>
            <StatusContent>
                <h3>{name.toUpperCase()} LV. {level}, {title}</h3>
                HP: {currHp}/{totalHp}
                <Line percent={getProgressPercentage(totalHp, currHp)} strokeColor="#e14141" {...barProps} />
                MP: {currMp}/{totalMp}
                <Line percent={getProgressPercentage(totalMp, currMp)}  strokeColor="#3898ff" {...barProps} />
                XP: {currXp}/{nextLevelXp}
                <Line percent={getProgressPercentage(nextLevelXp, currXp)} strokeColor="#83e04c" {...barProps} />
                <br />
                <br />
                <h3>Strength: {strength}{' '}[{'+3'}]{' +'}</h3>
                <h3>Dexterity: {dexterity}</h3>
                <h3>Inteligence: {inteligence}</h3>
                <h3>Health: {health}</h3>
            </StatusContent>
            <StatusContent>
                Skill List
            </StatusContent>
        </TabContent>
    )
};

export default Attributes;