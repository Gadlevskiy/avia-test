function Filter() {
  return (
    <div className='filter-field'>
      <form className='filter-field_form'>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Сортировать</p>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='radio' />- по возрастанию цены
          </label>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='radio' />- по убыванию цене
          </label>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='radio' />- по времени в пути
          </label>
        </div>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Фильтровать</p>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='checkbox' />- 1 пересадка
          </label>
          <label className='filter-field_label'>
            <input className='filter-field_input' type='checkbox' />- без пересадок
          </label>
        </div>
        <div className='filter-field_form-box'>
          <p className='filter-field_heading-text'>Цена</p>
          <label className='filter-field_label'>
            От
            <input className='filter-field_input' type='number' />
          </label>
          <label className='filter-field_label'>
            До
            <input className='filter-field_input' type='number' />
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
