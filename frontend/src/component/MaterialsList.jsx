import React, { useEffect, useState } from "react";
import AxiosInstance from "../axiosinstance";

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    AxiosInstance.get('/materials/')
      .then((response) => {
        setMaterials(response.data.all_materials);
      })
      .catch((error) => {
        console.error("There was an error fetching the materials!", error);
      });
  }, []);

  return (
    <div>
      <h1>Materials List</h1>
      <ul>
        <table>
        <thead>
            <th>title</th>
            <th>created at</th>
            <th>created by</th>
        </thead>
        <tbody>
            {materials.map((material) => (
                <tr>
                    <td key={material.id}>{material.title}</td>
                    <td>{material.created_at}</td>
                    <td>{material.created_by}</td>
                </tr>
            ))}
        </tbody>
        </table>
      </ul>
    </div>
  );
};

export default MaterialsList;
