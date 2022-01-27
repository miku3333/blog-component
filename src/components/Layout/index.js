import { useState, useEffect, useMemo, useCallback } from 'react'

export default function Layout (props) {
    const { children } = props;
    const totalWidth = useMemo(() => children.reduce((prev, cur) => prev + parseInt(cur.props.width), 0), children)
    const renderChild = useCallback((child) => {
        const { children, width } = child.props;
        return (
            <div style={{ flex: width }}>
                {Array.isArray(children) ? children.map(child => child) : children}
            </div>
        );
    }, [totalWidth])
    return (
        <div style={{ display: 'flex' }}>
            {children.map(renderChild)}
        </div>
    )
}
