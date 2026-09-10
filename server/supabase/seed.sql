-- ============================================
-- SIMORA SAMPLE DATA
-- ============================================

insert into categories (name, image_url)
values
('Fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050'),
('Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348'),
('Home', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'),
('Electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661'),
('Footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'),
('Accessories', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30')
on conflict do nothing;

insert into products
(category_id, name, description, price, discount_price, image_url, rating, stock, brand)
values
(
    1,
    'Women Casual Dress',
    'Comfortable and stylish casual dress for everyday use.',
    1299,
    899,
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    4.5,
    50,
    'SIMORA'
),
(
    1,
    'Traditional Kurti',
    'Elegant traditional kurti with modern styling.',
    999,
    699,
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2',
    4.3,
    40,
    'SIMORA'
),
(
    2,
    'Beauty Care Kit',
    'Complete daily beauty care essentials.',
    799,
    599,
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
    4.4,
    30,
    'SIMORA'
),
(
    3,
    'Home Decorative Lamp',
    'Modern decorative lamp for home interiors.',
    1499,
    999,
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    4.6,
    25,
    'SIMORA'
),
(
    4,
    'Wireless Headphones',
    'Comfortable wireless headphones with clear audio.',
    1999,
    1499,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    4.5,
    35,
    'SIMORA'
),
(
    5,
    'Casual Sneakers',
    'Lightweight sneakers suitable for daily activities.',
    1799,
    1299,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    4.7,
    45,
    'SIMORA'
);