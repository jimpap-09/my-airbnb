'use client';

import { useEffect, useState } from "react";

const ClientOnly = () => {

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        hasMounted ? <div>Client-side content</div> : null
    )
}

export default ClientOnly;