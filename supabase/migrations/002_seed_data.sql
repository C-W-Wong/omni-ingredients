-- =============================================
-- OMM E-Commerce Seed Data
-- Run this AFTER 001_initial_schema.sql
-- =============================================

-- =============================================
-- PART 1: Categories
-- =============================================

INSERT INTO categories (id, name, slug, description, display_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Omega-3s', 'omega-3s', 'Essential fatty acids for heart and brain health', 1),
  ('22222222-2222-2222-2222-222222222222', 'Vitamins', 'vitamins', 'Essential vitamins for overall wellness', 2),
  ('33333333-3333-3333-3333-333333333333', 'Probiotics', 'probiotics', 'Gut health and digestive support', 3),
  ('44444444-4444-4444-4444-444444444444', 'Minerals', 'minerals', 'Essential minerals for body function', 4);

-- =============================================
-- PART 2: Products
-- =============================================

-- Ultra Omega-3 Fish Oil (featured product with full data)
INSERT INTO products (id, slug, name, tagline, description, category_id, badge, other_ingredients, usage_instructions, warnings, is_active) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'omega-3-ultra', 'Ultra Omega-3 Fish Oil', 'Triple strength EPA & DHA complex',
   'Our premium Omega-3 Fish Oil delivers 2400mg of concentrated EPA and DHA per serving, sourced from wild-caught fish in pristine Nordic waters. Molecularly distilled for purity and tested for heavy metals, PCBs, and dioxins. Each batch undergoes third-party testing to ensure you receive only the highest quality omega-3 fatty acids for optimal heart, brain, and joint health.',
   '11111111-1111-1111-1111-111111111111', 'Best Seller',
   'Softgel capsule (gelatin, glycerin, purified water), natural lemon flavor, mixed tocopherols (antioxidant).',
   'Take 1-2 softgels daily with food, or as directed by your healthcare professional. For best results, take with a meal containing fat to enhance absorption.',
   'Consult your healthcare provider before use if you are pregnant, nursing, taking medication, or have a medical condition. Keep out of reach of children. Store in a cool, dry place. Do not use if seal is broken.',
   TRUE);

-- Vitamin D3 + K2
INSERT INTO products (id, slug, name, tagline, description, category_id, badge, is_active) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'vitamin-d3-k2', 'Vitamin D3 + K2', 'Synergistic formula for bone health',
   'This powerful combination supports calcium absorption and proper calcium utilization, promoting bone density and cardiovascular health.',
   '22222222-2222-2222-2222-222222222222', 'Popular', TRUE);

-- Advanced Probiotic 50B
INSERT INTO products (id, slug, name, tagline, description, category_id, badge, is_active) VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'probiotic-50b', 'Advanced Probiotic 50B', '50 billion CFU with 12 strains',
   'A comprehensive probiotic formula featuring 12 scientifically-studied strains to support digestive health and immune function.',
   '33333333-3333-3333-3333-333333333333', 'New', TRUE);

-- Magnesium Glycinate
INSERT INTO products (id, slug, name, tagline, description, category_id, is_active) VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'magnesium-glycinate', 'Magnesium Glycinate', 'Highly absorbable for relaxation & sleep',
   'A highly bioavailable form of magnesium that supports relaxation, sleep quality, and muscle function without digestive upset.',
   '44444444-4444-4444-4444-444444444444', TRUE);

-- Vitamin B Complex
INSERT INTO products (id, slug, name, tagline, description, category_id, is_active) VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'vitamin-b-complex', 'Vitamin B Complex', 'Complete B vitamin support for energy',
   'A complete spectrum of B vitamins to support energy metabolism, nervous system function, and cellular health.',
   '22222222-2222-2222-2222-222222222222', TRUE);

-- Antarctic Krill Oil
INSERT INTO products (id, slug, name, tagline, description, category_id, badge, is_active) VALUES
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'krill-oil', 'Antarctic Krill Oil', 'Phospholipid-bound omega-3s',
   'Premium krill oil providing omega-3s in their natural phospholipid form for superior absorption and bioavailability.',
   '11111111-1111-1111-1111-111111111111', 'Premium', TRUE);

-- Zinc + Copper Balance
INSERT INTO products (id, slug, name, tagline, description, category_id, is_active) VALUES
  ('11111111-aaaa-bbbb-cccc-111111111111', 'zinc-copper', 'Zinc + Copper Balance', 'Optimal ratio for immune support',
   'A balanced formula providing zinc and copper in their optimal ratio to support immune function and overall wellness.',
   '44444444-4444-4444-4444-444444444444', TRUE);

-- Women's Probiotic
INSERT INTO products (id, slug, name, tagline, description, category_id, is_active) VALUES
  ('22222222-aaaa-bbbb-cccc-222222222222', 'womens-probiotic', 'Women''s Probiotic', 'Targeted strains for feminine health',
   'Specially formulated with probiotic strains clinically studied for women''s health, vaginal flora balance, and urinary tract support.',
   '33333333-3333-3333-3333-333333333333', TRUE);

-- Vitamin C 1000mg
INSERT INTO products (id, slug, name, tagline, description, category_id, badge, is_active) VALUES
  ('33333333-aaaa-bbbb-cccc-333333333333', 'vitamin-c-1000', 'Vitamin C 1000mg', 'Buffered ascorbic acid with bioflavonoids',
   'A gentle, buffered form of Vitamin C enhanced with citrus bioflavonoids for optimal absorption and antioxidant support.',
   '22222222-2222-2222-2222-222222222222', 'Best Seller', TRUE);

-- Calcium + D3
INSERT INTO products (id, slug, name, tagline, description, category_id, is_active) VALUES
  ('44444444-aaaa-bbbb-cccc-444444444444', 'calcium-d3', 'Calcium + D3', 'Essential duo for strong bones',
   'A synergistic combination of calcium and Vitamin D3 to support bone density, strength, and overall skeletal health.',
   '44444444-4444-4444-4444-444444444444', TRUE);

-- =============================================
-- PART 3: Product Variants
-- =============================================

-- Omega-3 Ultra variants
INSERT INTO product_variants (id, product_id, name, sku, price, compare_at_price, in_stock, stock_quantity, servings, display_order) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '30 Softgels', 'OMG3-30', 24.99, NULL, TRUE, 100, 30, 1),
  ('a2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '60 Softgels', 'OMG3-60', 44.99, 49.98, TRUE, 150, 60, 2),
  ('a3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '90 Softgels', 'OMG3-90', 59.99, 74.97, TRUE, 75, 90, 3);

-- Other products - single variant each
INSERT INTO product_variants (product_id, name, sku, price, compare_at_price, in_stock, stock_quantity, servings, display_order) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '60 Capsules', 'VITD3K2-60', 28.00, NULL, TRUE, 200, 60, 1),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '30 Capsules', 'PROB50-30', 38.00, NULL, TRUE, 120, 30, 1),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '120 Capsules', 'MAGGLY-120', 32.00, NULL, TRUE, 180, 120, 1),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '60 Capsules', 'VITB-60', 24.00, NULL, TRUE, 150, 60, 1),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '60 Softgels', 'KRILL-60', 52.00, NULL, TRUE, 80, 60, 1),
  ('11111111-aaaa-bbbb-cccc-111111111111', '60 Capsules', 'ZNCU-60', 18.00, NULL, TRUE, 200, 60, 1),
  ('22222222-aaaa-bbbb-cccc-222222222222', '30 Capsules', 'WPRO-30', 42.00, NULL, TRUE, 100, 30, 1),
  ('33333333-aaaa-bbbb-cccc-333333333333', '100 Tablets', 'VITC-100', 22.00, NULL, TRUE, 250, 100, 1),
  ('44444444-aaaa-bbbb-cccc-444444444444', '120 Tablets', 'CALD3-120', 26.00, NULL, TRUE, 180, 120, 1);

-- =============================================
-- PART 4: Product Images
-- =============================================

-- Omega-3 Ultra images
INSERT INTO product_images (product_id, url, alt_text, display_order, is_primary) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop', 'Omega-3 Fish Oil bottle', 1, TRUE),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop', 'Softgel capsules close-up', 2, FALSE),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=800&fit=crop', 'Healthy lifestyle', 3, FALSE),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop', 'Supplement facts label', 4, FALSE);

-- Other products - single primary image
INSERT INTO product_images (product_id, url, alt_text, display_order, is_primary) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&h=800&fit=crop', 'Vitamin D3 + K2 bottle', 1, TRUE),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop', 'Advanced Probiotic bottle', 1, TRUE),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop', 'Magnesium Glycinate bottle', 1, TRUE),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&h=800&fit=crop', 'Vitamin B Complex bottle', 1, TRUE),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop', 'Krill Oil bottle', 1, TRUE),
  ('11111111-aaaa-bbbb-cccc-111111111111', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=800&fit=crop', 'Zinc + Copper bottle', 1, TRUE),
  ('22222222-aaaa-bbbb-cccc-222222222222', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=800&fit=crop', 'Womens Probiotic bottle', 1, TRUE),
  ('33333333-aaaa-bbbb-cccc-333333333333', 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&h=800&fit=crop', 'Vitamin C bottle', 1, TRUE),
  ('44444444-aaaa-bbbb-cccc-444444444444', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=800&fit=crop', 'Calcium + D3 bottle', 1, TRUE);

-- =============================================
-- PART 5: Product Ingredients (Omega-3 Ultra)
-- =============================================

INSERT INTO product_ingredients (product_id, name, amount, daily_value, display_order) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Fish Oil Concentrate', '2400mg', '†', 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'EPA (Eicosapentaenoic Acid)', '1200mg', '†', 2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'DHA (Docosahexaenoic Acid)', '800mg', '†', 3),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Other Omega-3 Fatty Acids', '400mg', '†', 4);

-- =============================================
-- PART 6: Product Benefits (Omega-3 Ultra)
-- =============================================

INSERT INTO product_benefits (product_id, benefit, display_order) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Supports cardiovascular health and healthy cholesterol levels', 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Promotes brain function and cognitive performance', 2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Helps maintain joint flexibility and comfort', 3),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Supports healthy inflammatory response', 4),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Molecularly distilled for maximum purity', 5),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Enteric-coated for easy digestion', 6);

-- =============================================
-- PART 7: Reviews (Omega-3 Ultra)
-- =============================================

INSERT INTO reviews (product_id, author_name, rating, title, content, is_verified, helpful_count, is_approved, created_at) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Sarah M.', 5, 'Finally, an omega-3 that doesn''t repeat on me!',
   'I''ve tried so many fish oil supplements and they always left me with that unpleasant fishy aftertaste. Not this one! The enteric coating really works. I''ve been taking it for 3 months now and my doctor noticed improved cholesterol numbers at my last checkup.',
   TRUE, 47, TRUE, '2025-12-28'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Michael R.', 5, 'High quality, noticeable difference',
   'As someone who''s been taking omega-3s for years, I can tell the difference in quality. These softgels are potent and I''ve noticed less joint stiffness after my morning runs. The third-party testing gives me confidence in what I''m taking.',
   TRUE, 32, TRUE, '2025-12-15'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jennifer L.', 4, 'Great product, wish the bottle was bigger',
   'Love the quality and how easy these are to swallow. My only wish is that they offered a larger bottle size. I go through these quickly since the whole family takes them. Will definitely keep reordering though!',
   TRUE, 18, TRUE, '2025-12-01'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'David K.', 5, 'Doctor recommended, works great',
   'My cardiologist specifically recommended this brand because of the high EPA/DHA content and purity standards. Been taking it for 6 months and my triglycerides have improved significantly. Easy to take, no fishy burps.',
   TRUE, 56, TRUE, '2025-11-20'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Amanda P.', 4, 'Good value for the quality',
   'The 90-count bottle is the best value. I appreciate that they use sustainable fishing practices and the product is tested for contaminants. Shipping was fast and the bottle arrived well-packaged.',
   FALSE, 12, TRUE, '2025-11-10');

-- =============================================
-- PART 8: Blog Categories
-- =============================================

INSERT INTO blog_categories (id, name, slug) VALUES
  ('bc111111-1111-1111-1111-111111111111', 'Wellness', 'wellness'),
  ('bc222222-2222-2222-2222-222222222222', 'Company News', 'company-news');

-- =============================================
-- PART 9: Authors
-- =============================================

INSERT INTO authors (id, name, slug, bio) VALUES
  ('ae111111-1111-1111-1111-111111111111', 'Dr. Sarah Chen', 'dr-sarah-chen', 'Nutritional biochemist and wellness researcher'),
  ('ae222222-2222-2222-2222-222222222222', 'Dr. Michael Torres', 'dr-michael-torres', 'Board-certified integrative medicine physician'),
  ('ae333333-3333-3333-3333-333333333333', 'Dr. James Morrison', 'dr-james-morrison', 'Founder & CEO of Omni Ingredients'),
  ('ae444444-4444-4444-4444-444444444444', 'Omni Ingredients Team', 'omni-team', 'The Omni Ingredients editorial team');

-- =============================================
-- PART 10: Blog Posts
-- =============================================

INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author_id, featured_image_url, read_time, is_featured, is_published, published_at) VALUES
  ('science-behind-omega-3-absorption',
   'The Science Behind Omega-3 Absorption',
   'Understanding how your body absorbs omega-3 fatty acids can help you maximize the benefits of your supplement routine.',
   '<p>Omega-3 fatty acids are essential nutrients that play crucial roles in brain function, heart health, and inflammation regulation. But simply taking a fish oil supplement isn''t enough—understanding how your body absorbs these fatty acids can help you get the most out of your supplement routine.</p><h2>The Role of Fat in Absorption</h2><p>Omega-3s are fat-soluble nutrients, which means they require dietary fat for optimal absorption. Studies have shown that taking omega-3 supplements with a meal containing fat can increase absorption by up to 300% compared to taking them on an empty stomach.</p><h2>Why Molecular Distillation Matters</h2><p>The form of omega-3 matters significantly. Molecularly distilled fish oil removes impurities and concentrates the beneficial EPA and DHA fatty acids. This process not only ensures purity but also creates a form that your body can more readily absorb.</p><h2>Timing Your Supplement</h2><p>For best results, take your omega-3 supplement with your largest meal of the day. This typically provides the most fat for absorption and can also help minimize any fishy aftertaste by allowing the capsule to mix thoroughly with food.</p><h2>Signs of Optimal Absorption</h2><p>When omega-3s are being well-absorbed, you may notice improvements in skin hydration, joint comfort, and mental clarity over several weeks of consistent use. If you''re not seeing results after 8-12 weeks, consider reviewing your timing and meal composition.</p>',
   'bc111111-1111-1111-1111-111111111111', 'ae111111-1111-1111-1111-111111111111',
   'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=600&fit=crop',
   5, TRUE, TRUE, '2026-01-05');

INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author_id, featured_image_url, read_time, is_featured, is_published, published_at) VALUES
  ('introducing-sustainable-packaging',
   'Introducing Our New Sustainable Packaging',
   'We''re proud to announce our transition to 100% recyclable packaging across all product lines.',
   '<p>At Omni Ingredients, sustainability isn''t just a buzzword—it''s a commitment we take seriously. Today, we''re excited to announce a major milestone in our environmental journey: the complete transition to 100% recyclable packaging across all our product lines.</p><h2>What''s Changing</h2><p>Starting this month, all Omni Ingredients supplements will ship in bottles made from post-consumer recycled plastic (PCR). Our labels are now printed with plant-based inks on FSC-certified paper, and our shipping materials are fully compostable.</p><h2>Reducing Our Carbon Footprint</h2><p>This transition is expected to reduce our packaging-related carbon emissions by 40% annually. We''ve also partnered with carbon offset programs to make our shipping carbon-neutral.</p><h2>Quality Remains Unchanged</h2><p>While our packaging is getting a green makeover, the quality inside remains the same. Our supplements continue to be manufactured in cGMP-certified facilities with third-party testing for purity and potency.</p><h2>How You Can Help</h2><p>We encourage all customers to recycle their empty bottles through local recycling programs. The bottles can be recycled with standard #1 and #2 plastics in most municipalities.</p>',
   'bc222222-2222-2222-2222-222222222222', 'ae444444-4444-4444-4444-444444444444',
   'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop',
   4, FALSE, TRUE, '2026-01-02');

INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author_id, featured_image_url, read_time, is_featured, is_published, published_at) VALUES
  ('signs-vitamin-d-deficiency',
   '5 Signs You May Be Vitamin D Deficient',
   'Vitamin D deficiency is surprisingly common. Here are the warning signs to watch for and what you can do about it.',
   '<p>Often called the "sunshine vitamin," Vitamin D is essential for bone health, immune function, and mood regulation. Yet studies suggest that up to 42% of American adults are deficient. Here are five signs that you might need more Vitamin D.</p><h2>1. Fatigue and Tiredness</h2><p>Feeling constantly tired despite adequate sleep can be a sign of Vitamin D deficiency. This vitamin plays a crucial role in energy production at the cellular level.</p><h2>2. Bone and Back Pain</h2><p>Vitamin D helps your body absorb calcium. Without enough of it, you may experience aching bones, particularly in your lower back, hips, and legs.</p><h2>3. Frequent Illness</h2><p>If you seem to catch every cold going around, low Vitamin D levels could be compromising your immune system. This vitamin is crucial for proper immune cell function.</p><h2>4. Mood Changes</h2><p>Research has linked Vitamin D deficiency to depression and seasonal affective disorder (SAD). The vitamin plays a role in serotonin production, our "feel-good" neurotransmitter.</p><h2>5. Slow Wound Healing</h2><p>If cuts and bruises seem to take forever to heal, inadequate Vitamin D may be slowing down your body''s repair processes.</p><h2>What You Can Do</h2><p>Talk to your healthcare provider about testing your Vitamin D levels. If deficient, a high-quality Vitamin D3 supplement, ideally paired with K2 for optimal absorption, can help restore healthy levels.</p>',
   'bc111111-1111-1111-1111-111111111111', 'ae222222-2222-2222-2222-222222222222',
   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop',
   6, FALSE, TRUE, '2025-12-28');

INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author_id, featured_image_url, read_time, is_featured, is_published, published_at) VALUES
  ('q4-2025-letter-from-founder',
   'Q4 2025: A Letter From Our Founder',
   'Reflecting on a year of growth, innovation, and our continued commitment to quality supplements.',
   '<p>Dear Omni Ingredients Community,</p><p>As we close out 2025, I want to take a moment to reflect on what has been an incredible year for our company and to thank you—our loyal customers—for being part of this journey.</p><h2>A Year of Growth</h2><p>This year, we welcomed over 50,000 new customers to the Omni family. We expanded our product line with six new formulations, each developed with the same rigorous standards that have defined our brand since day one.</p><h2>Quality Milestones</h2><p>We''re proud to have achieved NSF certification for our manufacturing processes, joining an elite group of supplement manufacturers who meet the highest industry standards. Every batch continues to undergo third-party testing for purity and potency.</p><h2>Looking Ahead to 2026</h2><p>Next year, we''re excited to launch our new personalized supplement program, introduce several innovative formulations based on emerging research, and expand our sustainability initiatives.</p><h2>Thank You</h2><p>None of this would be possible without your trust and support. We remain committed to providing you with the highest quality supplements to support your health and wellness journey.</p><p>Here''s to a healthy and happy 2026!</p><p><em>Dr. James Morrison<br/>Founder & CEO, Omni Ingredients</em></p>',
   'bc222222-2222-2222-2222-222222222222', 'ae333333-3333-3333-3333-333333333333',
   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
   4, FALSE, TRUE, '2025-12-20');

INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author_id, featured_image_url, read_time, is_featured, is_published, published_at) VALUES
  ('probiotics-immune-health',
   'How Probiotics Support Immune Health',
   'The gut-immune connection is stronger than you might think. Learn how probiotics can help keep you healthy.',
   '<p>Did you know that approximately 70% of your immune system resides in your gut? The connection between digestive health and immune function is one of the most exciting areas of nutritional research, and probiotics are at the center of it.</p><h2>The Gut-Immune Connection</h2><p>Your gut is home to trillions of bacteria—both beneficial and potentially harmful. A healthy balance of gut bacteria, known as the microbiome, is essential for proper immune function. Probiotics help maintain this balance.</p><h2>How Probiotics Help</h2><p>Beneficial bacteria in probiotics work in several ways to support immunity: they compete with harmful bacteria for resources, strengthen the gut barrier, and communicate directly with immune cells to modulate the immune response.</p><h2>Choosing the Right Probiotic</h2><p>Not all probiotics are created equal. Look for supplements that contain multiple strains, have a high CFU (colony-forming unit) count, and use delayed-release capsules to ensure the bacteria survive stomach acid.</p><h2>Beyond Immunity</h2><p>While immune support is a major benefit, probiotics also aid digestion, support nutrient absorption, and may even influence mood through the gut-brain axis. It''s truly a foundational supplement for overall wellness.</p>',
   'bc111111-1111-1111-1111-111111111111', 'ae111111-1111-1111-1111-111111111111',
   'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1200&h=600&fit=crop',
   5, FALSE, TRUE, '2025-12-15');

INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author_id, featured_image_url, read_time, is_featured, is_published, published_at) VALUES
  ('cgmp-certification-milestone',
   'New cGMP Certification Milestone',
   'Our manufacturing facility has achieved the highest level of cGMP certification, reinforcing our commitment to quality.',
   '<p>We''re thrilled to announce that our primary manufacturing facility has achieved cGMP (Current Good Manufacturing Practice) certification at the highest level, a testament to our unwavering commitment to quality and safety.</p><h2>What is cGMP?</h2><p>cGMP regulations are enforced by the FDA and ensure that products are consistently produced and controlled according to quality standards. They cover all aspects of production, from raw materials and facility maintenance to staff training and record-keeping.</p><h2>What This Means for You</h2><p>When you choose Omni Ingredients, you can trust that every supplement is manufactured under the strictest quality controls. Our cGMP certification means: raw materials are tested for identity and purity, manufacturing processes are validated and documented, our facility meets the highest cleanliness standards, and every batch is tested before release.</p><h2>Third-Party Verification</h2><p>In addition to cGMP certification, we voluntarily submit our products to third-party testing laboratories. These independent tests verify that our products contain exactly what''s on the label—nothing more, nothing less.</p><h2>Our Ongoing Commitment</h2><p>Quality isn''t a destination; it''s a journey. We continue to invest in our facilities, processes, and people to ensure that every Omni Ingredients product meets the highest standards in the industry.</p>',
   'bc222222-2222-2222-2222-222222222222', 'ae444444-4444-4444-4444-444444444444',
   'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=600&fit=crop',
   4, FALSE, TRUE, '2025-12-10');
