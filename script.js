// Current user state
        let currentUser = {
            type: null,
            name: '',
            email: ''
        };

        // Navigation functions
        function showPage(pageId) {
            console.log('Showing page:', pageId); // Debug log
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
            
            // Handle background switching
            if (pageId === 'farmerDashboard' || pageId === 'shopkeeperDashboard') {
                document.body.classList.add('dashboard-active');
            } else {
                document.body.classList.remove('dashboard-active');
            }
        }

        function showLoginPage() {
            console.log('Navigating to login page'); // Debug log
            document.body.classList.remove('dashboard-active');
            showPage('loginPage');
        }

        function showFarmerLogin() {
            console.log('Navigating to farmer login'); // Debug log
            document.body.classList.remove('dashboard-active');
            showPage('farmerLoginPage');
        }

        function showShopkeeperLogin() {
            console.log('Navigating to shopkeeper login'); // Debug log
            document.body.classList.remove('dashboard-active');
            showPage('shopkeeperLoginPage');
        }

        // Login functions
        function loginFarmer() {
            console.log('Farmer login clicked'); // Debug log
            const email = document.getElementById('farmerEmail').value;
            const password = document.getElementById('farmerPassword').value;
            
            console.log('Email:', email, 'Password:', password); // Debug log
            
            // Simple validation - just check if fields are not empty
            if (email && password) {
                currentUser = {
                    type: 'farmer',
                    name: email.split('@')[0],
                    email: email
                };
                
                console.log('Login successful, showing success message'); // Debug log
                
                // Show success message
                const successMsg = document.getElementById('farmerLoginSuccess');
                successMsg.classList.add('show');
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    console.log('Redirecting to farmer dashboard'); // Debug log
                    successMsg.classList.remove('show');
                    updateHeader();
                    showPage('farmerDashboard');
                    document.getElementById('fab').classList.add('active');
                }, 2000);
            } else {
                alert('Please enter both email and password');
            }
        }

        function loginShopkeeper() {
            console.log('Shopkeeper login clicked'); // Debug log
            const email = document.getElementById('shopkeeperEmail').value;
            const password = document.getElementById('shopkeeperPassword').value;
            
            console.log('Email:', email, 'Password:', password); // Debug log
            
            // Simple validation - just check if fields are not empty
            if (email && password) {
                currentUser = {
                    type: 'shopkeeper',
                    name: email.split('@')[0],
                    email: email
                };
                
                console.log('Login successful, showing success message'); // Debug log
                
                // Show success message
                const successMsg = document.getElementById('shopkeeperLoginSuccess');
                successMsg.classList.add('show');
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    console.log('Redirecting to shopkeeper dashboard'); // Debug log
                    successMsg.classList.remove('show');
                    updateHeader();
                    showPage('shopkeeperDashboard');
                }, 2000);
            } else {
                alert('Please enter both email and password');
            }
        }

        function updateHeader() {
            const userInfo = document.getElementById('userInfo');
            const userName = document.getElementById('userName');
            const userRole = document.getElementById('userRole');
            const userAvatar = document.getElementById('userAvatar');
            
            if (currentUser.type) {
                console.log('Updating header for user:', currentUser); // Debug log
                
                // Show user info
                userInfo.classList.add('active');
                userInfo.style.display = 'flex';
                
                // Update user details
                const displayName = currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1);
                userName.textContent = displayName;
                userRole.textContent = currentUser.type;
                userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
                
                // Set avatar color based on role
                if (currentUser.type === 'farmer') {
                    userAvatar.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                } else {
                    userAvatar.style.background = 'linear-gradient(45deg, #2196F3, #1976D2)';
                }
            } else {
                userInfo.classList.remove('active');
                userInfo.style.display = 'none';
            }
        }

        function logout() {
            currentUser = { type: null, name: '', email: '' };
            const userInfo = document.getElementById('userInfo');
            userInfo.classList.remove('active');
            userInfo.style.display = 'none';
            document.getElementById('fab').classList.remove('active');
            document.body.classList.remove('dashboard-active');
            showLoginPage();
        }

        // Dashboard navigation
        function showFarmerSection(sectionId) {
            // Update nav items
            document.querySelectorAll('#farmerDashboard .nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Find and activate the clicked nav item
            const clickedItem = Array.from(document.querySelectorAll('#farmerDashboard .nav-item')).find(item => 
                item.getAttribute('onclick') && item.getAttribute('onclick').includes(sectionId)
            );
            if (clickedItem) {
                clickedItem.classList.add('active');
            }
            
            // Show content
            document.querySelectorAll('#farmerDashboard .dashboard-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        }

        function showShopkeeperSection(sectionId) {
            // Update nav items
            document.querySelectorAll('#shopkeeperDashboard .nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Find and activate the clicked nav item
            const clickedItem = Array.from(document.querySelectorAll('#shopkeeperDashboard .nav-item')).find(item => 
                item.getAttribute('onclick') && item.getAttribute('onclick').includes(sectionId)
            );
            if (clickedItem) {
                clickedItem.classList.add('active');
            }
            
            // Show content
            document.querySelectorAll('#shopkeeperDashboard .dashboard-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Handle community section ID mapping
            const targetId = sectionId === 'community' ? 'shopkeeper-community' : sectionId;
            document.getElementById(targetId).classList.add('active');
        }

        // Modal functions
        function showPostModal(type) {
            if (type) {
                document.getElementById('postType').value = type;
            }
            document.getElementById('postModal').style.display = 'block';
        }

        function showAddProductModal() {
            document.getElementById('addProductModal').style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // FAB functionality
        document.getElementById('fab').onclick = function() {
            if (currentUser.type === 'farmer') {
                showPostModal();
            }
        };

        // User dropdown functions
        function toggleUserDropdown() {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.toggle('active');
        }

        function showProfile() {
            console.log('Show profile clicked');
            closeUserDropdown();
            // Add profile functionality here
            alert('Profile feature will be implemented soon!');
        }

        function showSettings() {
            console.log('Show settings clicked');
            closeUserDropdown();
            // Add settings functionality here
            alert('Settings feature will be implemented soon!');
        }

        function showNotifications() {
            console.log('Show notifications clicked');
            closeUserDropdown();
            // Add notifications functionality here
            alert('Notifications feature will be implemented soon!');
        }

        function showHelp() {
            console.log('Show help clicked');
            closeUserDropdown();
            // Add help functionality here
            alert('Help & Support feature will be implemented soon!');
        }

        function closeUserDropdown() {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.remove('active');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const userInfo = document.getElementById('userInfo');
            const dropdown = document.getElementById('userDropdown');
            
            if (userInfo && !userInfo.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Utility functions
        function updateCropPrices(region) {
            // Simulate price updates based on region
            const prices = {
                'maharashtra': {
                    wheat: '₹2,150',
                    rice: '₹1,890',
                    sugarcane: '₹350',
                    cotton: '₹6,250',
                    tomato: '₹1,200',
                    onion: '₹950'
                },
                'punjab': {
                    wheat: '₹2,200',
                    rice: '₹1,920',
                    sugarcane: '₹380',
                    cotton: '₹6,100',
                    tomato: '₹1,150',
                    onion: '₹890'
                }
            };
            
            // Update prices in the UI (simplified)
            console.log('Prices updated for region:', region);
        }

        function filterProducts(category) {
            // Simulate product filtering
            console.log('Filtering products by category:', category);
        }

        function submitPost() {
            // Simulate post submission
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message show';
            successMessage.textContent = 'Post shared successfully!';
            
            document.querySelector('.community-container').insertBefore(
                successMessage, 
                document.getElementById('communityFeed')
            );
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            closeModal('postModal');
        }

        function addProduct() {
            // Simulate product addition
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message show';
            successMessage.textContent = 'Product added successfully!';
            
            document.querySelector('#products .trending-section').insertBefore(
                successMessage,
                document.querySelector('#products .product-grid')
            );
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            closeModal('addProductModal');
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            // Any initialization code
            console.log('AgriConnect initialized');
        });