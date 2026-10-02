#!/usr/bin/env python3
"""
Backend API Test Suite for Camila Reyes Platform
Tests all API endpoints with valid and invalid cases
"""

import requests
import json
import random
import string
from datetime import datetime

# Base URL from environment
BASE_URL = "https://creator-studio-586.preview.emergentagent.com/api"

def random_email():
    """Generate a random email for testing"""
    rand = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    return f"test+{rand}@example.com"

def check_no_id_field(data, path="root"):
    """Recursively check that _id field is not present in response"""
    if isinstance(data, dict):
        if '_id' in data:
            return False, f"Found _id field at {path}"
        for key, value in data.items():
            result, msg = check_no_id_field(value, f"{path}.{key}")
            if not result:
                return False, msg
    elif isinstance(data, list):
        for i, item in enumerate(data):
            result, msg = check_no_id_field(item, f"{path}[{i}]")
            if not result:
                return False, msg
    return True, "No _id fields found"

def test_config():
    """Test GET /api/config endpoint"""
    print("\n" + "="*80)
    print("TEST: GET /api/config")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/config", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Check required fields
        required_fields = ['name', 'contactEmail', 'premiumUrl', 'social']
        for field in required_fields:
            if field not in data:
                print(f"❌ FAILED: Missing required field '{field}'")
                return False
        
        # Check social fields
        social_fields = ['instagram', 'tiktok', 'youtube', 'pinterest', 'x']
        for field in social_fields:
            if field not in data['social']:
                print(f"❌ FAILED: Missing social field '{field}'")
                return False
        
        # Check no _id field
        no_id, msg = check_no_id_field(data)
        if not no_id:
            print(f"❌ FAILED: {msg}")
            return False
        
        print("✅ PASSED: Config endpoint working correctly")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_newsletter():
    """Test POST /api/newsletter and GET /api/newsletter endpoints"""
    print("\n" + "="*80)
    print("TEST: Newsletter Endpoints")
    print("="*80)
    
    all_passed = True
    
    # Test 1: Valid subscription
    print("\n--- Test 1: Valid subscription ---")
    try:
        email = random_email()
        payload = {
            "email": email,
            "consent": True,
            "source": "test"
        }
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true")
                all_passed = False
            else:
                print("✅ PASSED: Valid subscription accepted")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 2: Duplicate subscription
    print("\n--- Test 2: Duplicate subscription ---")
    try:
        payload = {
            "email": email,
            "consent": True,
            "source": "test"
        }
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true for duplicate")
                all_passed = False
            elif 'already subscribed' not in data.get('message', '').lower():
                print(f"❌ FAILED: Expected 'already subscribed' message")
                all_passed = False
            else:
                print("✅ PASSED: Duplicate handled correctly")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 3: Invalid email
    print("\n--- Test 3: Invalid email ---")
    try:
        payload = {
            "email": "notanemail",
            "consent": True
        }
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if 'error' not in data:
                print(f"❌ FAILED: Expected error field in response")
                all_passed = False
            else:
                print("✅ PASSED: Invalid email rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 4: Missing consent
    print("\n--- Test 4: Missing consent ---")
    try:
        payload = {
            "email": "x@y.com",
            "consent": False
        }
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if 'error' not in data:
                print(f"❌ FAILED: Expected error field in response")
                all_passed = False
            else:
                print("✅ PASSED: Missing consent rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 5: GET newsletter list
    print("\n--- Test 5: GET newsletter list ---")
    try:
        response = requests.get(f"{BASE_URL}/newsletter", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            print(f"Response: count={data.get('count')}, subscribers={len(data.get('subscribers', []))}")
            
            if 'count' not in data or 'subscribers' not in data:
                print(f"❌ FAILED: Missing count or subscribers field")
                all_passed = False
            else:
                # Check no _id field
                no_id, msg = check_no_id_field(data)
                if not no_id:
                    print(f"❌ FAILED: {msg}")
                    all_passed = False
                else:
                    print("✅ PASSED: Newsletter list retrieved without _id")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    return all_passed

def test_contact():
    """Test POST /api/contact endpoint"""
    print("\n" + "="*80)
    print("TEST: Contact Endpoint")
    print("="*80)
    
    all_passed = True
    
    # Test 1: Valid contact submission
    print("\n--- Test 1: Valid contact submission ---")
    try:
        payload = {
            "name": "Jane Smith",
            "email": random_email(),
            "company": "Test Corp",
            "category": "Media",
            "message": "This is a test message for the contact form."
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true")
                all_passed = False
            else:
                print("✅ PASSED: Valid contact submission accepted")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 2: Missing name
    print("\n--- Test 2: Missing name ---")
    try:
        payload = {
            "email": random_email(),
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            print("✅ PASSED: Missing name rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 3: Missing message
    print("\n--- Test 3: Missing message ---")
    try:
        payload = {
            "name": "John Doe",
            "email": random_email()
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            print("✅ PASSED: Missing message rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 4: Invalid email
    print("\n--- Test 4: Invalid email ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "bademail",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            print("✅ PASSED: Invalid email rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    return all_passed

def test_blog():
    """Test GET /api/blog and GET /api/blog/:slug endpoints"""
    print("\n" + "="*80)
    print("TEST: Blog Endpoints")
    print("="*80)
    
    all_passed = True
    
    # Test 1: GET blog list
    print("\n--- Test 1: GET blog list ---")
    try:
        response = requests.get(f"{BASE_URL}/blog", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            posts = data.get('posts', [])
            print(f"Response: {len(posts)} posts returned")
            
            if len(posts) < 4:
                print(f"❌ FAILED: Expected at least 4 seeded posts, got {len(posts)}")
                all_passed = False
            else:
                # Check that body field is NOT present in list
                first_post = posts[0]
                if 'body' in first_post:
                    print(f"❌ FAILED: Body field should not be in list response")
                    all_passed = False
                else:
                    # Check required fields
                    required = ['slug', 'title', 'category', 'cover', 'excerpt']
                    missing = [f for f in required if f not in first_post]
                    if missing:
                        print(f"❌ FAILED: Missing fields in post: {missing}")
                        all_passed = False
                    else:
                        # Check no _id field
                        no_id, msg = check_no_id_field(data)
                        if not no_id:
                            print(f"❌ FAILED: {msg}")
                            all_passed = False
                        else:
                            print("✅ PASSED: Blog list retrieved correctly without body field")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 2: GET single blog post
    print("\n--- Test 2: GET single blog post (morning-coffee-with-camila) ---")
    try:
        response = requests.get(f"{BASE_URL}/blog/morning-coffee-with-camila", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            post = data.get('post')
            related = data.get('related', [])
            
            if not post:
                print(f"❌ FAILED: Missing post field")
                all_passed = False
            elif 'body' not in post:
                print(f"❌ FAILED: Body field should be present in single post")
                all_passed = False
            elif not isinstance(post['body'], list):
                print(f"❌ FAILED: Body should be an array")
                all_passed = False
            else:
                print(f"Post has body with {len(post['body'])} sections")
                print(f"Related posts: {len(related)}")
                
                # Check related posts are same category and different slug
                if related:
                    for rel in related:
                        if rel.get('slug') == post.get('slug'):
                            print(f"❌ FAILED: Related post has same slug as main post")
                            all_passed = False
                            break
                        if rel.get('category') != post.get('category'):
                            print(f"❌ FAILED: Related post has different category")
                            all_passed = False
                            break
                
                # Check no _id field
                no_id, msg = check_no_id_field(data)
                if not no_id:
                    print(f"❌ FAILED: {msg}")
                    all_passed = False
                else:
                    print("✅ PASSED: Single blog post retrieved with body and related posts")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 3: GET non-existent blog post
    print("\n--- Test 3: GET non-existent blog post ---")
    try:
        response = requests.get(f"{BASE_URL}/blog/does-not-exist", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 404:
            print(f"❌ FAILED: Expected 404, got {response.status_code}")
            all_passed = False
        else:
            print("✅ PASSED: Non-existent post returns 404")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    return all_passed

def test_gallery():
    """Test GET /api/gallery endpoint"""
    print("\n" + "="*80)
    print("TEST: Gallery Endpoint")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/gallery", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        items = data.get('items', [])
        print(f"Response: {len(items)} gallery items returned")
        
        if len(items) < 15:
            print(f"❌ FAILED: Expected ~20 seeded items, got {len(items)}")
            return False
        
        # Check required fields
        first_item = items[0]
        required = ['category', 'src', 'alt', 'caption']
        missing = [f for f in required if f not in first_item]
        if missing:
            print(f"❌ FAILED: Missing fields in gallery item: {missing}")
            return False
        
        # Check no _id field
        no_id, msg = check_no_id_field(data)
        if not no_id:
            print(f"❌ FAILED: {msg}")
            return False
        
        print("✅ PASSED: Gallery items retrieved correctly without _id")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_products():
    """Test GET /api/products and GET /api/products/:id endpoints"""
    print("\n" + "="*80)
    print("TEST: Products Endpoints")
    print("="*80)
    
    all_passed = True
    
    # Test 1: GET products list
    print("\n--- Test 1: GET products list ---")
    try:
        response = requests.get(f"{BASE_URL}/products", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            products = data.get('products', [])
            print(f"Response: {len(products)} products returned")
            
            if len(products) != 8:
                print(f"❌ FAILED: Expected 8 seeded products, got {len(products)}")
                all_passed = False
            else:
                # Check no _id field
                no_id, msg = check_no_id_field(data)
                if not no_id:
                    print(f"❌ FAILED: {msg}")
                    all_passed = False
                else:
                    print("✅ PASSED: Products list retrieved correctly")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 2: GET single product
    print("\n--- Test 2: GET single product (p1) ---")
    try:
        response = requests.get(f"{BASE_URL}/products/p1", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            product = data.get('product')
            
            if not product:
                print(f"❌ FAILED: Missing product field")
                all_passed = False
            else:
                # Check no _id field
                no_id, msg = check_no_id_field(data)
                if not no_id:
                    print(f"❌ FAILED: {msg}")
                    all_passed = False
                else:
                    print(f"Product: {product.get('name', 'N/A')}")
                    print("✅ PASSED: Single product retrieved correctly")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 3: GET non-existent product
    print("\n--- Test 3: GET non-existent product ---")
    try:
        response = requests.get(f"{BASE_URL}/products/nope", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 404:
            print(f"❌ FAILED: Expected 404, got {response.status_code}")
            all_passed = False
        else:
            print("✅ PASSED: Non-existent product returns 404")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    return all_passed

def test_analytics():
    """Test POST /api/analytics endpoint"""
    print("\n" + "="*80)
    print("TEST: Analytics Endpoint")
    print("="*80)
    
    try:
        payload = {
            "event": "page_view",
            "meta": {
                "page": "home"
            }
        }
        response = requests.post(f"{BASE_URL}/analytics", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('success'):
            print(f"❌ FAILED: Expected success=true")
            return False
        
        print("✅ PASSED: Analytics event tracked successfully")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        return False

def test_collab():
    """Test POST /api/collab endpoint (brand collaboration enquiries)"""
    print("\n" + "="*80)
    print("TEST: Brand Collaboration Endpoint")
    print("="*80)
    
    all_passed = True
    
    # Test 1: Valid submission with all fields
    print("\n--- Test 1: Valid submission with all fields ---")
    try:
        payload = {
            "name": "Acme PR",
            "company": "Acme Travel",
            "email": "brand@acme.com",
            "campaignType": "Travel & hospitality",
            "budget": "$5,000",
            "message": "Hotel campaign collaboration."
        }
        response = requests.post(f"{BASE_URL}/collab", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true")
                all_passed = False
            else:
                # Check no _id field
                no_id, msg = check_no_id_field(data)
                if not no_id:
                    print(f"❌ FAILED: {msg}")
                    all_passed = False
                else:
                    print("✅ PASSED: Valid collaboration enquiry accepted")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 2: Missing name
    print("\n--- Test 2: Missing name ---")
    try:
        payload = {
            "company": "Test Corp",
            "email": "test@example.com",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/collab", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if 'error' not in data:
                print(f"❌ FAILED: Expected error field in response")
                all_passed = False
            else:
                print("✅ PASSED: Missing name rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 3: Invalid email
    print("\n--- Test 3: Invalid email ---")
    try:
        payload = {
            "name": "John Doe",
            "email": "notanemail",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/collab", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if 'error' not in data:
                print(f"❌ FAILED: Expected error field in response")
                all_passed = False
            else:
                print("✅ PASSED: Invalid email rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 4: Missing message
    print("\n--- Test 4: Missing message ---")
    try:
        payload = {
            "name": "Jane Smith",
            "email": "jane@example.com"
        }
        response = requests.post(f"{BASE_URL}/collab", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected 400, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if 'error' not in data:
                print(f"❌ FAILED: Expected error field in response")
                all_passed = False
            else:
                print("✅ PASSED: Missing message rejected")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 5: Valid submission WITHOUT optional fields (company and budget)
    print("\n--- Test 5: Valid submission without company and budget ---")
    try:
        payload = {
            "name": "Sarah Johnson",
            "email": "sarah@brandagency.com",
            "campaignType": "Fashion",
            "message": "Interested in fashion collaboration for spring collection."
        }
        response = requests.post(f"{BASE_URL}/collab", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true")
                all_passed = False
            else:
                # Check no _id field
                no_id, msg = check_no_id_field(data)
                if not no_id:
                    print(f"❌ FAILED: {msg}")
                    all_passed = False
                else:
                    print("✅ PASSED: Valid submission without optional fields accepted")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    return all_passed

def test_regression_contact_newsletter():
    """Quick regression check for contact and newsletter endpoints"""
    print("\n" + "="*80)
    print("TEST: Regression Check - Contact & Newsletter")
    print("="*80)
    
    all_passed = True
    
    # Test 1: POST /api/contact with valid payload
    print("\n--- Test 1: POST /api/contact (regression) ---")
    try:
        payload = {
            "name": "Regression Test User",
            "email": random_email(),
            "message": "This is a regression test message."
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true")
                all_passed = False
            else:
                print("✅ PASSED: Contact endpoint still working")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    # Test 2: POST /api/newsletter with valid payload
    print("\n--- Test 2: POST /api/newsletter (regression) ---")
    try:
        payload = {
            "email": random_email(),
            "consent": True
        }
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            if not data.get('success'):
                print(f"❌ FAILED: Expected success=true")
                all_passed = False
            else:
                print("✅ PASSED: Newsletter endpoint still working")
        
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {str(e)}")
        all_passed = False
    
    return all_passed

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("CAMILA REYES BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    
    results = {}
    
    # Run NEW collab endpoint test first (current focus)
    results['collab'] = test_collab()
    
    # Quick regression check
    results['regression'] = test_regression_contact_newsletter()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.upper()}: {status}")
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    print(f"\nTotal: {passed}/{total} test suites passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test suite(s) failed")
        return 1

if __name__ == "__main__":
    exit(main())
