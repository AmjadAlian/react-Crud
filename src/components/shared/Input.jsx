import React from 'react'

export default function Input({id,name,type,title,handelData,customClass,errors,value}) {
    return (

        <div className="mb-3">
        <label htmlFor={id} className="form-label">{title}</label>
            <input type={type}  name={name} className={` form-control ${customClass}`} id= {id} value = {value} onChange={handelData} />
            {errors[name] && <p className='text-danger'>{errors[name]}</p>}
        </div>
    )
}
