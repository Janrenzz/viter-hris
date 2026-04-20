import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import { apiVersion } from "../../../functions/functions-general";
import { useInView } from "react-intersection-observer";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import Loadmore from "../../../partials/Loadmore";
import Status from "../../../partials/Status";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";
import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalRestore from "../../../partials/modals/ModalRestore";
import ModalDelete from "../../../partials/modals/ModalDelete";
import SearchBar from "../../../partials/spinners/SearchBar";

const EmployeesList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState(null);
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["employees", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``,
        `${apiVersion}/controllers/developers/employees/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        `post`,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="relative">
          <label htmlFor="">Status</label>
          <select
            onChange={(e) => setFilterData(e.target.value)}
            value={filterData}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>

      <div className="relative pt-4 rounded-md">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Employee Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {!error &&
              (status === "pending" || result?.pages[0]?.count == 0) && (
                <tr>
                  <td colSpan="100" className="p-10">
                    {status === "pending" ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}

            {error && (
              <tr>
                <td colSpan="100" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {result?.pages?.map((pageData, pageKey) => (
              <React.Fragment key={pageKey}>
                {pageData?.data?.map((item, key) => {
                  const fullName =
                    `${item.employee_first_name ?? ""} ${item.employee_last_name ?? ""}`.trim();

                  return (
                    <tr key={key}>
                      <td>{counter++}</td>

                      <td>
                        <Status
                          text={
                            item.employee_is_active == 1 ? "active" : "inactive"
                          }
                        />
                      </td>

                      <td>{fullName}</td>

                      <td>
                        <div className="flex items-center justify-between gap-4">
                          <span>{item.employee_email}</span>

                          <div className="flex items-center gap-3 shrink-0">
                            {item.employee_is_active == 1 ? (
                              <>
                                <button
                                  type="button"
                                  className="tooltip-action-table"
                                  data-tooltip="Edit"
                                  onClick={() => handleEdit(item)}
                                >
                                  <FaEdit />
                                </button>

                                <button
                                  type="button"
                                  className="tooltip-action-table"
                                  data-tooltip="Archive"
                                  onClick={() => handleArchive(item)}
                                >
                                  <FaArchive />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="tooltip-action-table"
                                  data-tooltip="Restore"
                                  onClick={() => handleRestore(item)}
                                >
                                  <FaTrashRestore />
                                </button>

                                <button
                                  type="button"
                                  className="tooltip-action-table"
                                  data-tooltip="Delete"
                                  onClick={() => handleDelete(item)}
                                >
                                  <FaTrash />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="loadmore flex justify-center flex-col items-center pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || result?.isFilter}
          />
        </div>
      </div>

      {store.isArchive && itemEdit && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/employees/active.php?id=${itemEdit.employee_aid}`}
          msg="Are you sure you want to archive this record?"
          successMsg="Succesfully Archived"
          item={`${itemEdit.employee_first_name} ${itemEdit.employee_last_name}`}
          dataItem={itemEdit}
          queryKey="employees"
        />
      )}

      {store.isRestore && itemEdit && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/employees/active.php?id=${itemEdit.employee_aid}`}
          msg="Are you sure you want to restore this record?"
          successMsg="Succesfully Restored"
          item={`${itemEdit.employee_first_name} ${itemEdit.employee_last_name}`}
          dataItem={itemEdit}
          queryKey="employees"
        />
      )}

      {store.isDelete && itemEdit && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/employees/employees.php?id=${itemEdit.employee_aid}`}
          msg="Are you sure you want to delete this record?"
          successMsg="Succesfully Deleted"
          item={`${itemEdit.employee_first_name} ${itemEdit.employee_last_name}`}
          dataItem={itemEdit}
          queryKey="employees"
        />
      )}
    </>
  );
};

export default EmployeesList;
