import react from 'react';

function Filter({ onFilter, bestPrices }) {
  const [isOrderChecked, setIsOrderChecked] = react.useState('1');
  const [isTransferChecked, setIsTransferChecked] = react.useState(false);
  const [isNoTransferChecked, setIsNoTransferChecked] = react.useState(false);
  const [minFilterValue, setMinFilterValue] = react.useState('0');
  const [maxFilterValue, setMaxFilterValue] = react.useState('100000');
  const [values, setValues] = react.useState();

  react.useEffect(() => {
    setValues(bestPrices);
  }, [bestPrices]);

  function handleChangeOrderBtn(e) {
    setIsOrderChecked(e.target.value);
    onFilter(
      e.target.value,
      isTransferChecked,
      isNoTransferChecked,
      minFilterValue,
      maxFilterValue,
      values
    );
  }

  function handleChangeTransferValue(e) {
    setIsTransferChecked(e.target.checked);
    onFilter(
      isOrderChecked,
      e.target.checked,
      isNoTransferChecked,
      minFilterValue,
      maxFilterValue,
      values
    );
  }

  function handleChangeNoTransferValue(e) {
    setIsNoTransferChecked(e.target.checked);
    onFilter(
      isOrderChecked,
      isTransferChecked,
      e.target.checked,
      minFilterValue,
      maxFilterValue,
      values
    );
  }

  function handleChangeMinFilterValue(e) {
    setMinFilterValue(e.target.value);
    onFilter(
      isOrderChecked,
      isTransferChecked,
      isNoTransferChecked,
      e.target.value,
      maxFilterValue,
      values
    );
  }

  function handleChangeMaxFilterValue(e) {
    setMaxFilterValue(e.target.value);
    onFilter(
      isOrderChecked,
      isTransferChecked,
      isNoTransferChecked,
      minFilterValue,
      e.target.value,
      values
    );
  }

  function handleChangePriceTag(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const updatePrices = values.map((subject) => {
      if (subject.name === item) {
        return {
          ...subject,
          checked: isChecked,
        };
      }

      return subject;
    });
    setValues(updatePrices);
    onFilter(
      isOrderChecked,
      isTransferChecked,
      isNoTransferChecked,
      minFilterValue,
      maxFilterValue,
      updatePrices
    );
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
          {bestPrices
            ? bestPrices.map((item, i) => {
                return (
                  <label key={i} className='filter-field_label'>
                    <input
                      className='filter-field_input'
                      type='checkbox'
                      name={item.name}
                      value={item.name}
                      checked={!!values[i] ? values[i].checked : false}
                      onChange={handleChangePriceTag}
                    />
                    -<span className='filter-field_text'>{item.name}</span> от {item.bestPrice}р
                  </label>
                );
              })
            : ''}
        </div>
      </form>
    </div>
  );
}

export default Filter;
