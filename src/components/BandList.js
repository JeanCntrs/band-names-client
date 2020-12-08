import React, { useState, useEffect } from 'react';;

const BandList = ({ data }) => {
    const [bands, setBands] = useState(data);
    console.log(data)
    useEffect(() => {
        setBands(data);
    }, [data]);

    const createRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td><button className="btn btn-primary">+1</button></td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                        />
                    </td>
                    <td><h3>15</h3></td>
                    <td><button className="btn btn-danger">Delete</button></td>
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