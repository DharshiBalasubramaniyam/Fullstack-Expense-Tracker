import { memo } from "react";

const PageInfo = memo(({ info, onPrevClick, onNextClick, pageNumber, noOfPages }) => {
    return (
        <div className="page-info">
            <span>{info}</span>
            <button onClick={onPrevClick} className={pageNumber == 0 ? "disable" : ""}><i class='fa fa-caret-left' aria-hidden='true'></i></button>
            <button onClick={onNextClick} className={pageNumber + 1 == noOfPages ? "disable" : ""}><i class='fa fa-caret-right' aria-hidden='true'></i></button>
        </div>
    )
})

export default PageInfo;