import React from "react";
const Bar = ({ children, title, subtitle }) => {
    return (
        <div>
            <div>{children}</div>
            {/* {children} */}
        </div>
    );
};

export default Bar;
