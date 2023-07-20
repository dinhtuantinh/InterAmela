import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db as firebaseDB } from "../../firebase";
import { toast } from "react-toastify";
import "./css/Product.css";

const Product = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    firebaseDB.child("products").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Bạn có chắc muốn xóa sản phẩm này ?")
    ) {
      firebaseDB.child(`products/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Xóa sản phẩm thành công");
        }
      });
    }
  };
  return (
    <div className="container-products">
      <table className="styled-table">
        <thead>
          <tr>
            <th className="column-name">STT</th>
            <th className="column-name">Tên</th>
            <th className="column-name">Mô tả</th>
            <th className="column-name">Số lượng</th>
            <th className="column-name">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].desc}</td>
                <td>{data[id].quantity}</td>
                <td>
                  <Link to={`/view/${id}`}>
                    <button className="bttn btn-view">View</button>
                  </Link>
                  <Link to={`/update/${id}`}>
                    <button className="bttn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="bttn btn-delete"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
