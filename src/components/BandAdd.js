import React, { useState } from 'react';

const BandAdd = ({ handleAddBand }) => {
    const [value, setValue] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        if (value.trim().length > 0) {
            handleAddBand(value);
            setValue('');
        }
    }

    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </form>
        </>
    );
}

export default BandAdd;