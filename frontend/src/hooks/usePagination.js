import { useState } from "react";

function usePagination(initialSortField = null) {
    const pageSize = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const [noOfPages, setNoOfPages] = useState(1);
    const [noOfRecords, setNoOfRecords] = useState(0);
    const [sortField, setSortField] = useState(initialSortField)
    const [sortDirec, setSortDirec] = useState('DESC')
    const [searchKey, setSearchKey] = useState('');

    const onPrevClick = () => {
        if (pageNumber !== 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    const onNextClick = () => {
        setPageNumber(pageNumber + 1)
    }

    const getPageInfo = () => {
        const start = (pageNumber * pageSize) + 1
        const end = pageNumber + 1 === noOfPages ? noOfRecords : (pageNumber * pageSize) + pageSize

        return String(start) + " to " + String(end) + " of " + String(noOfRecords) + " records"
    }

    return {
        pageSize, pageNumber, noOfPages, sortField, sortDirec, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSortField, setSortDirec, setSearchKey, getPageInfo
    }
}

export default usePagination;