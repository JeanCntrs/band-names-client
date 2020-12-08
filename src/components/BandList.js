import React, { useState, useEffect } from 'react';;

const BandList = ({ data }) => {
    const [bands, setBands] = useState(data);

    const handleBandNameChange = (event, id) => {
        const newBandName = event.target.value;

        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newBandName;
            }

            return band;
        }));
    }

    const handleLostFocus = (id, name) => {
        console.log(id, name)
    }

    const createRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button className="btn btn-primary">+1</button>
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
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            ))
        );
    }

    useEffect(() => {
        setBands(data);
    }, [data]);

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