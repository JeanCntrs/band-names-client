import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandList = () => {
    const [bands, setBands] = useState([]);
    const { socket } = useContext(SocketContext);

    const handleBandNameChange = (event, id) => {
        const newBandName = event.target.value;

        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newBandName;
            }

            return band;
        }));
    }

    const handleLostFocus = (id, newName) => {
        socket.emit('change-name', { id, newName });
    }

    const handleIncreaseVotes = id => {
        socket.emit('increase-votes', id);
    }

    const handleRemoveBand = id => {
        socket.emit('remove-band', id);
    }

    useEffect(() => {
        socket.on('current-bands', bands => {
            setBands(bands);
        });
        return () => socket.off('current-bands');
    }, [socket]);

    const createRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleIncreaseVotes(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                            onChange={event => handleBandNameChange(event, band.id)}
                            onBlur={() => handleLostFocus(band.id, band.name)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveBand(band.id)}
                        >Delete</button>
                    </td>
                </tr>
            ))
        );
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    );
}

export default BandList;