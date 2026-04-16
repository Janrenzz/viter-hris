import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import Layout from "../Layout";

const Dashboard = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="dashboard">
        {/* Page Header */}
        <div className="flex items-center justify-between w-full">
          <h1>Dashboard</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              //   onClick={handleAdd}
            >
              <FaPlus />
              Add
            </button>
          </div>
        </div>
        {/* PAGE CONTENT */}
        <div>
          {/* <RolesList itemEdit={itemEdit} setItemEdit={setItemEdit} /> */}
        </div>
      </Layout>

      {/* {store.isAdd && <ModalAddRoles itemEdit={itemEdit}></ModalAddRoles>} */}
    </>
  );
};

export default Dashboard;
