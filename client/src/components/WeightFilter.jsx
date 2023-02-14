const WeightFilter = ({setWeightChoices, weightChoices, value}) => {

    const handleClick = (e) => {
        const target = weightChoices.find(x => x.value === value)
        setWeightChoices([...weightChoices] , target.isActive = e.target.checked);
    }
    let addedInfo;
    if (value === 'light') addedInfo = '(less than 22lb)';
    else if (value === 'medium') addedInfo = '(22 to 55lb)';
    else addedInfo = '(more than 55lb)';

    return (
        <div className='filter-item'>
            <input type="checkbox" name={value} id={value} onChange={handleClick} checked={weightChoices.find(x => x.value === value).isActive === true ? 'checked' : ''}/>
            <label htmlFor={value}>{value + addedInfo}</label>
        </div>
    )
};

export default WeightFilter;