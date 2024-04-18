import { memo } from "react";
import Sidebar from "../sidebar/sidebar";

const Container = memo(({ children, activeNavId }) => {
    return (
        <div className="user-panel">
            <Sidebar activeNavId={activeNavId} />
            <div className="user-content">
                {children}
            </div>
        </div>
    )
})

export default Container;