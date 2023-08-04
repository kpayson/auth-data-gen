import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const tenantEntity: SeedEntity =
{
    name: 'Tenant',
    dataGen: (keys, i) => {
        const secrets = {
            "jwks": [
                {
                    "jwk": {
                        "kty": "RSA",
                        "kid": "yJERvHWrXPtX00mGHcR3BmfklFemFfhZ7e791RBCchM",
                        "use": "sig",
                        "alg": "RS256",
                        "e": "AQAB",
                        "n": "u_oXk-2K9z7vNwxbXRUhylEwXBprPtlouxxyhN8lynUHUWjh8aUPzwy2msaXwtesaajQtjfXujpI_1SYcr-q9G-GaTyJGpZhwUW5paE6bKcEdSiMt_ejYXX9m0AKsmC_68DP_kFCzR7hhPC-WXHeRNdpCv5caXwaaHgNrw-KNhGvC5ecIvctZ0KAb3ZaFX6fzXiVdIa0Uw5EchnWFoeQd3J_YezEDEjRVmpIDBum8nOiXzE0rqBLhj9ASP1ftSE-2kOfKaQ_o3kYUasJjDWx3Ouo1wn6AXJew7m6l1Ug4E_mCqDKAUw0Y-usnIVXlY6mGmyq4uMizxtm_1M247am2Q", "d": "TrDMK_31_bjX1ViT6qyM_6_rKbNZj-7dW-71tc_gdxd0n8zjQRBTRN7SlopqP4Ofxn-IF6_a3DfIFTMpumeoPjltsCJKVtn7RDhXFhIfbhqg0BbQibbeK0-EgfhWQgQkc6G8sHhLaajyyX8qgDEd1f3DGHoQ34u3VmJjgBRmTGl08pxPguOQhj4FYEoZKRqy1DCuzpCeXzO1cHdiDQfJNX-P5AfYM8J8506UR8GfUaYLBTc8TzDYHgKB1KjOUiyOXTTwyIGkrqosAFcYN5G1FaJTgt328WBBsGjQuWFYbH9aGrgZJUlV_hn88IBcAF8tOZngfO2PyaK-5W8WWdD0sQ",
                        "p": "4wxVGXnaMCHi72Dv8_wBNYteIniJG3hBpWvQ-vhOQp_-zcH4a7M4AUtfDNTXoobknZDc12vOtU-Vo_QFdcj9E8XeYAqqw1XWkWfpFy36tQHwqMb0uzclnxyT4WBxD-yCYnmSHIRHquLIn918Y-xODMRyAhJU9jbImCEwfsbI_3U",
                        "q": "0_JVcTDaS7hA17y-Dg7tqPlQyzVAe7vdpQER9LprX22cYiL3W12VuCXilFDcp8vyLxeh9Qv6ZfkNb8-7fEW2TGAbBtc2zHuhI8iYBEcXApJ7o1jEp2hqCdt44pckGS8Tid-yxsgQSrFCADW-NsX0Cmmqul5N6cqfaW1Zp1Yk4VU",
                        "dp": "JSG5MSdqdYC1OmziEUbfc8BNLtoDokhyg_kz_jdppR_BbikQ1ZxDxoJrExAkC-J_tP0iAOEStzhCwsN_uRmbugYcLhzQfI2nP7R8vFu6qqucjh2rnIqSTok_7hX1p6MIV86GBL_lcJ8SLILuevEEerYN5yTUXEftWmPjKHieGpk",
                        "dq": "vRkxclQL8BLsh482YoSfNmt60lMovTzYfCeARcEtm27IYCaiWzocIrhqd7nNpUgpRCrprSCKwAB9JI1K0Y3BIFN-yZOqqLaFBtAqEWb7-KeI-CxzCIn4UeMm78O5yV5fKFwVvZUyM_IC2P0aQPRM0B2G3dDV4wmNQRr3Kn2JWiE",
                        "qi": "LW7hCpQlNiEpJkt7FxP4wUIQ6NfX9aIR4wunhSsHmNn4_G7aoEsZJGjAvokzGSMp1ZmYj5gEIqC8UMdcdEOsacg_Oke3Rg4bhVWHh9pVgjE3RyW0r2NhyPhDjGYcPdf-t-dI5YRUYGPJqn8oXFYMgHgX8y1yPJdYMbMBCCRd7yg"
                    },
                    "expires": "2024-07-21T00:46:05.621Z"
                }
            ],
            "certificates": { "x509": [{ "key": "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEowIBAAKCAQEAshilNDGjC+PNczBzNFBYyXAALKvjmlJmjhFnKj6ZD+s6E6HD\r\nCMUJ/lp+uuV4hKt8Mt1OjTx/+wLEiR7kB6nQ7jm4Ou4bEads3JNErW2/Dvb0qamy\r\nKcDw5Zj+dVEQTym2UdGiNy9JO2iOt23ayBkrH+23YFdYI1Hl19p4y0D3NiyNq/vV\r\nycOWqfFAodR7wYnldBy8le09hzpOSQxuaeAm3ReMtn5W8C1gHoR0O9+ETIrd8vHQ\r\nfA9kZn5dHJzQKmn8gURD4KGpi5GGS8N5WgKyrkkmPVck6nKdZcNGkbad0N+AOl4W\r\nn5EH+KvycbW3OTGzM1ueevSg8YI8D5DnKLbVVQIDAQABAoIBAGKe2SS889/KpuNJ\r\nihIHCBOMDNyv1pqHVLkJFArFnTa+eGuUoQ7DJdSOwiy2k3VMDLuR50S4otoZ30Fb\r\nNMS1mbfBiK5BWgX9o3/FoTs0UZ90y2kESl9qsztA7G+EkzZzD73hCyXp7nCSZq1W\r\njNdPcJz+oxQbafgtCszr8wYClKKPPp0IJxSrbB2tr5tTl+nNz9bF3jjWzmxSxcYn\r\nmYZGrrBs6LRQmLGZDD54xM9fFzDkMx3fmbxJl72MVVjOLCx5runem08ExHTlYakW\r\nR0n3uCCutIVO5rOGR7nWhYI1cEZ7YsEj8EEni/GPe/oBou7YRcI4e2KQYQf0GKYm\r\nJIsapKECgYEA4M1eYk0eUdgF2unJsrbGMQFMvesL2TCX0ucz4tdGt+YfZ6Mhbp9X\r\n+m0pEKYZE8C9h9doxAF2PDhZaww5RR5G1K6LF4GcwyIcgkVYqjbMFD94TpBZqgB7\r\n1qNZja10JIW6y9S0PQ1pqy1ZvHZNAO0384o+MSxNTAqU4TC0Eu8xBukCgYEAys/v\r\n59TN1qJnkYgi6mmCiN8J1NFRZumI5WYN9gbdCHYCX1HWwLLYTfzFrZTb2+NpQLuv\r\ntTpG2YFGuKZZHDy4SIk+h5cbDbg+0LI6IhzzAwV4n2JONtFaNYdq+bTe40ZVupuq\r\nKh70bmaFsBW81SJFNYYf/Yq6WjKElVcWQi6fb40CgYEAkRQY4InyklE+3hvZHqwU\r\nVhYHp92kROO2Z9bsRm42ZoJuLB08ez78sVJ3mRYIwxW1e5CKPUzQOGcJViuKXk/+\r\n2E1Y2K++MrS1/2CvqxI4PK0FgHZqV2t+gHPlXKjfdp6Tge5g77HTSzS2YAldAscV\r\nP+gs4OE9dWCy2m3rGPkjA9kCgYA0/52rsXqQyiPSbgbhxuyro81H5eMlx4VUnRSs\r\n5CJCocQA8Lvz40iPKKznrWy+y3Cnz+Qcsbvt/tBiVGYY8O0fV24VtLEHJsyTcN+s\r\nJnCCq51X2TKjNJYkQtz7n/5W2fxxJViUZT5u0y/AUg3kjG4VjJUzhlsoUuc+t2FD\r\nrjdPyQKBgHY6MxpWlG9jR8bxpPnemSqA3kPuo794NXuC9ztWViA9BqgnPkVn5UDd\r\np8bUQYGT1ujfblY6LmhSqzbMJ1oLmRQmCQu4Nh4lIXpy+/pG82M4McOytgIcyY11\r\nJhlNGUdxf6pO6pvMawuuNe5CKS9lGDwMz8YDzzz/RqmzVHAft6bn\r\n-----END RSA PRIVATE KEY-----\r\n", "cert": "-----BEGIN CERTIFICATE-----\r\nMIIDYTCCAkmgAwIBAgIJVLgZQ3JvheZ2MA0GCSqGSIb3DQEBBQUAMGMxFTATBgNV\r\nBAMTDGxhYnNoYXJlLm9yZzELMAkGA1UEBhMCVVMxEjAQBgNVBAcTCVJvY2t2aWxs\r\nZTELMAkGA1UECBMCTUQxDDAKBgNVBAoTA05JSDEOMAwGA1UECxMFTkNBVFMwHhcN\r\nMjMwNzIxMDA0NjA1WhcNMjgwNzE5MDA0NjA1WjBjMRUwEwYDVQQDEwxsYWJzaGFy\r\nZS5vcmcxCzAJBgNVBAYTAlVTMRIwEAYDVQQHEwlSb2NrdmlsbGUxCzAJBgNVBAgT\r\nAk1EMQwwCgYDVQQKEwNOSUgxDjAMBgNVBAsTBU5DQVRTMIIBIjANBgkqhkiG9w0B\r\nAQEFAAOCAQ8AMIIBCgKCAQEAshilNDGjC+PNczBzNFBYyXAALKvjmlJmjhFnKj6Z\r\nD+s6E6HDCMUJ/lp+uuV4hKt8Mt1OjTx/+wLEiR7kB6nQ7jm4Ou4bEads3JNErW2/\r\nDvb0qamyKcDw5Zj+dVEQTym2UdGiNy9JO2iOt23ayBkrH+23YFdYI1Hl19p4y0D3\r\nNiyNq/vVycOWqfFAodR7wYnldBy8le09hzpOSQxuaeAm3ReMtn5W8C1gHoR0O9+E\r\nTIrd8vHQfA9kZn5dHJzQKmn8gURD4KGpi5GGS8N5WgKyrkkmPVck6nKdZcNGkbad\r\n0N+AOl4Wn5EH+KvycbW3OTGzM1ueevSg8YI8D5DnKLbVVQIDAQABoxgwFjAUBgNV\r\nHREEDTALgglsb2NhbGhvc3QwDQYJKoZIhvcNAQEFBQADggEBAIv1HZYqRZwz8w16\r\nCsAGZjH/Ak7EcJC3uE5PF/A3KiJMTAn5327oMXIbZqkJo1FABsPMeRxr2JNTyhe8\r\nx+mnJC11t+Zf/e5EJucht91l8Cn/zETph45jK9j27A0IYCx7sPkACZ9AP/LE8gje\r\no7lO8AlRi/b+0iyXLfFIGkSAV2cuuE3q+snlAPo7wo0tAocy8yuWTditqmUI2ZEQ\r\nbJnE7bYxLBIk34VF82iu/ULi0dIJTjFcc90oVv9smU7sS/iwkUktspqg2rlB/c2f\r\ndHNfLaP3JqE3F01JMAufZpPxAMYgfIYi/pOCfgmJtuINeh0VSgytvbZf1tH1v+At\r\nOnVVg4Q=\r\n-----END CERTIFICATE-----\r\n" }] },
            "cookies": { "keys": ["YxCvGE49Rvw35aQs8c6GgQu8Ov8Q16pXktXENMEDkpFdRHdDrISYLPBknOKnUqiU81JAwAtIodvBuKmBIDgkWReq9iRUQcBqtgZC"] }
        }
        const tenant = {
            title: faker.word.words(3),
            description: faker.word.words(3),
            tenantId: faker.word.noun() + i,
            secrets: JSON.stringify(secrets)
        }
        return tenant;
    },
    isManyToManyRelation: false
};