import React from "react";
import Pagination from "react-js-pagination";


const PaginationProcess = () => {
  return (
    <div>
      <Pagination
        activePage={5}
        itemsCountPerPage={10}
        totalItemsCount={45}
        pageRangeDisplayed={5}
      />
    </div>
  );
};

export default PaginationProcess;
