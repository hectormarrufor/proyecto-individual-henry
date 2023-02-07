const HeightFilter = ({setHeightChoices, heightChoices, value}) => {

    const handleClick = (e) => {
        const target = heightChoices.find(x => x.value === value)
        setHeightChoices([...heightChoices] , target.isActive = e.target.checked);
    }
    let addedInfo;
    if (value === 'small') addedInfo = '(less than 16in)';
    else if (value === 'average') addedInfo = '(16-22in)';
    else addedInfo = '(more than 22in)';

    return (
        <div className='filter-item'>
            <input type="checkbox" name={value} id={value} onClick={handleClick} />
            <label htmlFor={value}>{value + addedInfo}</label>
        </div>
    )
};

export default HeightFilter;