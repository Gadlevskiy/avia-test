import react from 'react';

function Filter({ onFilter, onSort, onFilterByPrice }) {
  const [isOrderChecked, setIsOrderChecked] = react.useState('1');
  const [isTransferChecked, setIsTransferChecked] = react.useState(false);
  const [isNoTransferChecked, setIsNoTransferChecked] = react.useState(false);
  const [minFilterValue, setMinFilterValue] = react.useState('0');
  const [maxFilterValue, setMaxFilterValue] = react.useState('100000');

  function handleChangeOrderBtn(e) {
    setIsOrderChecked(e.target.value);
    onSort(e.target.value)
    // console.log(e.target.value)
  }

  function handleChangeTransferValue(e) {
    setIsTransferChecked(e.target.checked);
    onFilter(e.target.checked, isNoTransferChecked);
  }

  function handleChangeNoTransferValue(e) {
    setIsNoTransferChecked(e.target.checked);
    onFilter(isTransferChecked, e.target.checked);
  }

  function handleChangeMinFilterValue(e) {
    setMinFilterValue(e.target.value);
    onFilterByPrice(e.target.value, maxFilterValue)
  }

  function handleChangeMaxFilterValue(e) {
    setMaxFilterValue(e.target.value);
    onFilterByPrice(minFilterValue, e.target.value)
  }

  return (
    <div className='filter-field'>
      <form className='filter-field_form'>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Сортировать</p>
          <label className='filter-field_label'>
            <input
              className='filter-field_input'
              type='radio'
              name='sort'
              id='sortChoice1'
              value='1'
              checked={isOrderChecked === '1' ? true : false}
              onChange={handleChangeOrderBtn}
            />
            - по возрастанию цены
          </label>
          <label className='filter-field_label'>
            <input
              className='filter-field_input'
              type='radio'
              name='sort'
              id='sortChoice2'
              value='2'
              checked={isOrderChecked === '2' ? true : false}
              onChange={handleChangeOrderBtn}
            />
            - по убыванию цене
          </label>
          <label className='filter-field_label'>
            <input
              className='filter-field_input'
              type='radio'
              name='sort'
              id='sortChoice3'
              value='3'
              checked={isOrderChecked === '3' ? true : false}
              onChange={handleChangeOrderBtn}
            />
            - по времени в пути
          </label>
        </div>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Фильтровать</p>
          <label className='filter-field_label'>
            <input
              className='filter-field_input'
              type='checkbox'
              checked={isTransferChecked}
              onChange={handleChangeTransferValue}
            />
            - 1 пересадка
          </label>
          <label className='filter-field_label'>
            <input
              className='filter-field_input'
              type='checkbox'
              checked={isNoTransferChecked}
              onChange={handleChangeNoTransferValue}
            />
            - без пересадок
          </label>
        </div>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Цена</p>
          <label className='filter-field_label'>
            От
            <input
              className='filter-field_input'
              type='number'
              placeholder='0'
              value={minFilterValue || ''}
              onChange={handleChangeMinFilterValue}
            />
          </label>
          <label className='filter-field_label'>
            До
            <input
              className='filter-field_input'
              type='number'
              placeholder='10000'
              value={maxFilterValue || ''}
              onChange={handleChangeMaxFilterValue}
            />
          </label>
        </div>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Авиакомпании</p>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='checkbox' />- lot 121212p
          </label>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='checkbox' />- Aeroflot 234134134p
          </label>
        </div>
      </form>
    </div>
  );
}

export default Filter;
