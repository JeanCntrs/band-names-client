import React, { useState } from 'react';
import { useSocket } from '../hooks/useSocket';

const BandAdd = () => {
    const [value, setValue] = useState('');
    const { socket } = useSocket('http://localhost:8080');

    const handleSubmit = event => {
        event.preventDefault();

        if (value.trim().length > 0) {
            socket.emit('add-band', { name: value });
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