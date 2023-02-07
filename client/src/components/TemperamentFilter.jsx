const TemperamentFilter = ({temperament, isActive, setTemperaments, temperaments}) => {

    const handleClick = (e) => {

        const i = temperaments.findIndex(x => x.temperament === e.target.name);
        setTemperaments([...temperaments] , temperaments[i].isActive = e.target.checked);
        // console.log(temperaments);
    }

    return (
        <div className='filter-item'>
            <input type="checkbox" name={temperament} id={temperament} onClick={handleClick} />
            <label htmlFor={temperament}>{temperament}</label>
        </div>
    )
};

export default TemperamentFilter;
