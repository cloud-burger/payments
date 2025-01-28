-- cria banco de dados
CREATE DATABASE payment;

-- conecta no banco criado
\c payment;

-- define schema como padrão
SET search_path TO public;

-- criação da tabela payments
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(100),
    amount NUMERIC NOT NULL,
    order_id VARCHAR(100),
    emv VARCHAR(300) NOT NULL,
    external_id NUMERIC,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT payments_pk PRIMARY KEY (id)
);

INSERT INTO public.payments VALUES('4c75c2df-f5d4-4f45-b35b-390e9d52d5b7', 45.48, '1376c2b4-74bd-477c-8f44-7cc593e8c734', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234556, 'PAID', now(), now());
INSERT INTO public.payments VALUES('85e3a35c-1ecb-4ed5-b599-8b39a5118f39', 32.50, 'a0aad9ce-35ea-43a6-b3e8-ac8d63943fd7', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234557, 'PAID', now(), now());
INSERT INTO public.payments VALUES('ee379546-6b28-486c-bfbe-fcb656baca56', 19.50, '52541b29-b267-4ec7-a311-a4ed5cd087af', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234558, 'PAID', now(), now());
INSERT INTO public.payments VALUES('1a8597df-d8a2-47ce-9c4a-d014ec9036e7', 16.00, '7aa7bc1a-5e31-420f-867c-72f5ba460e35', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234559, 'PAID', now(), now());
INSERT INTO public.payments VALUES('e9df5ea8-2781-4345-b0f6-dc599881541d', 31.00, 'c53c89b6-2459-421d-9a91-9e9e89aee932', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234551, 'PAID', now(), now());
INSERT INTO public.payments VALUES('57a21737-10e4-4f23-962e-28845f529500', 84.48, '6489d886-987f-406b-be43-204bf79e5de2', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234552, 'PAID', now(), now());
INSERT INTO public.payments VALUES('1f15a7d3-3c6f-4836-bcb6-d5827b854dfb', 23.50, '063289a6-cd2f-4be0-baaa-7f2132a5a9bf', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234553, 'PAID', now(), now());
INSERT INTO public.payments VALUES('c0cd450e-11cb-4b7c-935c-41092c819ac5', 24.00, '9cdb3b16-f115-43aa-9b4b-05c0de1007eb', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234554, 'PAID', now(), now());
INSERT INTO public.payments VALUES('30090dd9-ac43-41de-8ad4-0b909f9f588e', 64.99, '1deda162-6c13-407d-bbff-68e4ee7ea401', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234555, 'PAID', now(), now());
INSERT INTO public.payments VALUES('fe205443-eddd-4e7c-aabe-7a47f5fc071b', 40.98, '849df40b-877c-4f80-9083-cd02d5f04605', '00020101021243650016COM.MERCADOLIBRE020130636d2d2370b-8f44-46bd-9f81-7ec48a63c63c5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D55C', 1234521, 'PAID', now(), now());