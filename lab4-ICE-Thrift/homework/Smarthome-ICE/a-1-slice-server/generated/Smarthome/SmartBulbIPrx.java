//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.10
//
// <auto-generated>
//
// Generated from file `smarthome.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

package Smarthome;

public interface SmartBulbIPrx extends SmartLightIPrx
{
    default BulbConfig getConfig()
        throws InvalidLightBulbStateException
    {
        return getConfig(com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default BulbConfig getConfig(java.util.Map<String, String> context)
        throws InvalidLightBulbStateException
    {
        try
        {
            return _iceI_getConfigAsync(context, true).waitForResponseOrUserEx();
        }
        catch(InvalidLightBulbStateException ex)
        {
            throw ex;
        }
        catch(com.zeroc.Ice.UserException ex)
        {
            throw new com.zeroc.Ice.UnknownUserException(ex.ice_id(), ex);
        }
    }

    default java.util.concurrent.CompletableFuture<BulbConfig> getConfigAsync()
    {
        return _iceI_getConfigAsync(com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<BulbConfig> getConfigAsync(java.util.Map<String, String> context)
    {
        return _iceI_getConfigAsync(context, false);
    }

    /**
     * @hidden
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<BulbConfig> _iceI_getConfigAsync(java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<BulbConfig> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "getConfig", com.zeroc.Ice.OperationMode.Idempotent, sync, _iceE_getConfig);
        f.invoke(true, context, null, null, istr -> {
                     BulbConfig ret;
                     ret = BulbConfig.ice_read(istr);
                     return ret;
                 });
        return f;
    }

    /** @hidden */
    static final Class<?>[] _iceE_getConfig =
    {
        InvalidLightBulbStateException.class
    };

    default void setColor(Color color)
        throws InvalidLightBulbStateException
    {
        setColor(color, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default void setColor(Color color, java.util.Map<String, String> context)
        throws InvalidLightBulbStateException
    {
        try
        {
            _iceI_setColorAsync(color, context, true).waitForResponseOrUserEx();
        }
        catch(InvalidLightBulbStateException ex)
        {
            throw ex;
        }
        catch(com.zeroc.Ice.UserException ex)
        {
            throw new com.zeroc.Ice.UnknownUserException(ex.ice_id(), ex);
        }
    }

    default java.util.concurrent.CompletableFuture<Void> setColorAsync(Color color)
    {
        return _iceI_setColorAsync(color, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<Void> setColorAsync(Color color, java.util.Map<String, String> context)
    {
        return _iceI_setColorAsync(color, context, false);
    }

    /**
     * @hidden
     * @param iceP_color -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<Void> _iceI_setColorAsync(Color iceP_color, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<Void> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "setColor", com.zeroc.Ice.OperationMode.Idempotent, sync, _iceE_setColor);
        f.invoke(true, context, null, ostr -> {
                     Color.ice_write(ostr, iceP_color);
                 }, null);
        return f;
    }

    /** @hidden */
    static final Class<?>[] _iceE_setColor =
    {
        InvalidLightBulbStateException.class
    };

    default void setDiodeType(DiodeType type)
        throws InvalidLightBulbStateException
    {
        setDiodeType(type, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default void setDiodeType(DiodeType type, java.util.Map<String, String> context)
        throws InvalidLightBulbStateException
    {
        try
        {
            _iceI_setDiodeTypeAsync(type, context, true).waitForResponseOrUserEx();
        }
        catch(InvalidLightBulbStateException ex)
        {
            throw ex;
        }
        catch(com.zeroc.Ice.UserException ex)
        {
            throw new com.zeroc.Ice.UnknownUserException(ex.ice_id(), ex);
        }
    }

    default java.util.concurrent.CompletableFuture<Void> setDiodeTypeAsync(DiodeType type)
    {
        return _iceI_setDiodeTypeAsync(type, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<Void> setDiodeTypeAsync(DiodeType type, java.util.Map<String, String> context)
    {
        return _iceI_setDiodeTypeAsync(type, context, false);
    }

    /**
     * @hidden
     * @param iceP_type -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<Void> _iceI_setDiodeTypeAsync(DiodeType iceP_type, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<Void> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "setDiodeType", com.zeroc.Ice.OperationMode.Idempotent, sync, _iceE_setDiodeType);
        f.invoke(true, context, null, ostr -> {
                     DiodeType.ice_write(ostr, iceP_type);
                 }, null);
        return f;
    }

    /** @hidden */
    static final Class<?>[] _iceE_setDiodeType =
    {
        InvalidLightBulbStateException.class
    };

    /**
     * Contacts the remote server to verify that the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SmartBulbIPrx checkedCast(com.zeroc.Ice.ObjectPrx obj)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, ice_staticId(), SmartBulbIPrx.class, _SmartBulbIPrxI.class);
    }

    /**
     * Contacts the remote server to verify that the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @param context The Context map to send with the invocation.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SmartBulbIPrx checkedCast(com.zeroc.Ice.ObjectPrx obj, java.util.Map<String, String> context)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, context, ice_staticId(), SmartBulbIPrx.class, _SmartBulbIPrxI.class);
    }

    /**
     * Contacts the remote server to verify that a facet of the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @param facet The name of the desired facet.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SmartBulbIPrx checkedCast(com.zeroc.Ice.ObjectPrx obj, String facet)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, facet, ice_staticId(), SmartBulbIPrx.class, _SmartBulbIPrxI.class);
    }

    /**
     * Contacts the remote server to verify that a facet of the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @param facet The name of the desired facet.
     * @param context The Context map to send with the invocation.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SmartBulbIPrx checkedCast(com.zeroc.Ice.ObjectPrx obj, String facet, java.util.Map<String, String> context)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, facet, context, ice_staticId(), SmartBulbIPrx.class, _SmartBulbIPrxI.class);
    }

    /**
     * Downcasts the given proxy to this type without contacting the remote server.
     * @param obj The untyped proxy.
     * @return A proxy for this type.
     **/
    static SmartBulbIPrx uncheckedCast(com.zeroc.Ice.ObjectPrx obj)
    {
        return com.zeroc.Ice.ObjectPrx._uncheckedCast(obj, SmartBulbIPrx.class, _SmartBulbIPrxI.class);
    }

    /**
     * Downcasts the given proxy to this type without contacting the remote server.
     * @param obj The untyped proxy.
     * @param facet The name of the desired facet.
     * @return A proxy for this type.
     **/
    static SmartBulbIPrx uncheckedCast(com.zeroc.Ice.ObjectPrx obj, String facet)
    {
        return com.zeroc.Ice.ObjectPrx._uncheckedCast(obj, facet, SmartBulbIPrx.class, _SmartBulbIPrxI.class);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the per-proxy context.
     * @param newContext The context for the new proxy.
     * @return A proxy with the specified per-proxy context.
     **/
    @Override
    default SmartBulbIPrx ice_context(java.util.Map<String, String> newContext)
    {
        return (SmartBulbIPrx)_ice_context(newContext);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the adapter ID.
     * @param newAdapterId The adapter ID for the new proxy.
     * @return A proxy with the specified adapter ID.
     **/
    @Override
    default SmartBulbIPrx ice_adapterId(String newAdapterId)
    {
        return (SmartBulbIPrx)_ice_adapterId(newAdapterId);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the endpoints.
     * @param newEndpoints The endpoints for the new proxy.
     * @return A proxy with the specified endpoints.
     **/
    @Override
    default SmartBulbIPrx ice_endpoints(com.zeroc.Ice.Endpoint[] newEndpoints)
    {
        return (SmartBulbIPrx)_ice_endpoints(newEndpoints);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the locator cache timeout.
     * @param newTimeout The new locator cache timeout (in seconds).
     * @return A proxy with the specified locator cache timeout.
     **/
    @Override
    default SmartBulbIPrx ice_locatorCacheTimeout(int newTimeout)
    {
        return (SmartBulbIPrx)_ice_locatorCacheTimeout(newTimeout);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the invocation timeout.
     * @param newTimeout The new invocation timeout (in seconds).
     * @return A proxy with the specified invocation timeout.
     **/
    @Override
    default SmartBulbIPrx ice_invocationTimeout(int newTimeout)
    {
        return (SmartBulbIPrx)_ice_invocationTimeout(newTimeout);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for connection caching.
     * @param newCache <code>true</code> if the new proxy should cache connections; <code>false</code> otherwise.
     * @return A proxy with the specified caching policy.
     **/
    @Override
    default SmartBulbIPrx ice_connectionCached(boolean newCache)
    {
        return (SmartBulbIPrx)_ice_connectionCached(newCache);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the endpoint selection policy.
     * @param newType The new endpoint selection policy.
     * @return A proxy with the specified endpoint selection policy.
     **/
    @Override
    default SmartBulbIPrx ice_endpointSelection(com.zeroc.Ice.EndpointSelectionType newType)
    {
        return (SmartBulbIPrx)_ice_endpointSelection(newType);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for how it selects endpoints.
     * @param b If <code>b</code> is <code>true</code>, only endpoints that use a secure transport are
     * used by the new proxy. If <code>b</code> is false, the returned proxy uses both secure and
     * insecure endpoints.
     * @return A proxy with the specified selection policy.
     **/
    @Override
    default SmartBulbIPrx ice_secure(boolean b)
    {
        return (SmartBulbIPrx)_ice_secure(b);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the encoding used to marshal parameters.
     * @param e The encoding version to use to marshal request parameters.
     * @return A proxy with the specified encoding version.
     **/
    @Override
    default SmartBulbIPrx ice_encodingVersion(com.zeroc.Ice.EncodingVersion e)
    {
        return (SmartBulbIPrx)_ice_encodingVersion(e);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for its endpoint selection policy.
     * @param b If <code>b</code> is <code>true</code>, the new proxy will use secure endpoints for invocations
     * and only use insecure endpoints if an invocation cannot be made via secure endpoints. If <code>b</code> is
     * <code>false</code>, the proxy prefers insecure endpoints to secure ones.
     * @return A proxy with the specified selection policy.
     **/
    @Override
    default SmartBulbIPrx ice_preferSecure(boolean b)
    {
        return (SmartBulbIPrx)_ice_preferSecure(b);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the router.
     * @param router The router for the new proxy.
     * @return A proxy with the specified router.
     **/
    @Override
    default SmartBulbIPrx ice_router(com.zeroc.Ice.RouterPrx router)
    {
        return (SmartBulbIPrx)_ice_router(router);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the locator.
     * @param locator The locator for the new proxy.
     * @return A proxy with the specified locator.
     **/
    @Override
    default SmartBulbIPrx ice_locator(com.zeroc.Ice.LocatorPrx locator)
    {
        return (SmartBulbIPrx)_ice_locator(locator);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for collocation optimization.
     * @param b <code>true</code> if the new proxy enables collocation optimization; <code>false</code> otherwise.
     * @return A proxy with the specified collocation optimization.
     **/
    @Override
    default SmartBulbIPrx ice_collocationOptimized(boolean b)
    {
        return (SmartBulbIPrx)_ice_collocationOptimized(b);
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses twoway invocations.
     * @return A proxy that uses twoway invocations.
     **/
    @Override
    default SmartBulbIPrx ice_twoway()
    {
        return (SmartBulbIPrx)_ice_twoway();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses oneway invocations.
     * @return A proxy that uses oneway invocations.
     **/
    @Override
    default SmartBulbIPrx ice_oneway()
    {
        return (SmartBulbIPrx)_ice_oneway();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses batch oneway invocations.
     * @return A proxy that uses batch oneway invocations.
     **/
    @Override
    default SmartBulbIPrx ice_batchOneway()
    {
        return (SmartBulbIPrx)_ice_batchOneway();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses datagram invocations.
     * @return A proxy that uses datagram invocations.
     **/
    @Override
    default SmartBulbIPrx ice_datagram()
    {
        return (SmartBulbIPrx)_ice_datagram();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses batch datagram invocations.
     * @return A proxy that uses batch datagram invocations.
     **/
    @Override
    default SmartBulbIPrx ice_batchDatagram()
    {
        return (SmartBulbIPrx)_ice_batchDatagram();
    }

    /**
     * Returns a proxy that is identical to this proxy, except for compression.
     * @param co <code>true</code> enables compression for the new proxy; <code>false</code> disables compression.
     * @return A proxy with the specified compression setting.
     **/
    @Override
    default SmartBulbIPrx ice_compress(boolean co)
    {
        return (SmartBulbIPrx)_ice_compress(co);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for its connection timeout setting.
     * @param t The connection timeout for the proxy in milliseconds.
     * @return A proxy with the specified timeout.
     **/
    @Override
    default SmartBulbIPrx ice_timeout(int t)
    {
        return (SmartBulbIPrx)_ice_timeout(t);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for its connection ID.
     * @param connectionId The connection ID for the new proxy. An empty string removes the connection ID.
     * @return A proxy with the specified connection ID.
     **/
    @Override
    default SmartBulbIPrx ice_connectionId(String connectionId)
    {
        return (SmartBulbIPrx)_ice_connectionId(connectionId);
    }

    /**
     * Returns a proxy that is identical to this proxy, except it's a fixed proxy bound
     * the given connection.@param connection The fixed proxy connection.
     * @return A fixed proxy bound to the given connection.
     **/
    @Override
    default SmartBulbIPrx ice_fixed(com.zeroc.Ice.Connection connection)
    {
        return (SmartBulbIPrx)_ice_fixed(connection);
    }

    static String ice_staticId()
    {
        return "::Smarthome::SmartBulbI";
    }
}
