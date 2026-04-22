// cards.js
// XCS229 Machine Learning flashcards, organized by topic.
// Each card: { q, a, cat } where cat matches a key in CATEGORIES below.

const CATEGORIES = [
  { id: "sl",   label: "Supervised Learning"      },
  { id: "gen",  label: "Generative Learning"       },
  { id: "svm",  label: "Kernels & SVMs"            },
  { id: "dt",   label: "Decision Trees & Ensembles"},
  { id: "un",   label: "Unsupervised Learning"     },
  { id: "dl",   label: "Deep Learning"             },
  { id: "th",   label: "ML Theory"                 },
  { id: "rl",   label: "Reinforcement Learning"    },
];

const CARDS = [

  // ── 1. Supervised Learning ────────────────────────────────────────────────

  { cat: "sl", q: "What is supervised learning?",
    a: "Learning a function h: X → Y from a training set of labeled examples {(x⁽ⁱ⁾, y⁽ⁱ⁾)}. Regression when y ∈ ℝ; classification when y is discrete." },

  { cat: "sl", q: "What is the least-squares cost function for linear regression?",
    a: "J(θ) = ½ Σᵢ (hθ(x⁽ⁱ⁾) − y⁽ⁱ⁾)², the sum of squared errors. Minimized by gradient descent or the normal equations." },

  { cat: "sl", q: "What is the LMS (Widrow-Hoff) update rule?",
    a: "θⱼ := θⱼ + α (y⁽ⁱ⁾ − hθ(x⁽ⁱ⁾)) xⱼ⁽ⁱ⁾. Update magnitude is proportional to the prediction error." },

  { cat: "sl", q: "What is the difference between batch and stochastic gradient descent?",
    a: "Batch GD scans the entire training set before each parameter update. SGD updates after each single example — faster progress on large datasets but noisier." },

  { cat: "sl", q: "What are the normal equations for linear regression?",
    a: "θ = (XᵀX)⁻¹ Xᵀy. A closed-form solution that minimizes J(θ) exactly, without iterating." },

  { cat: "sl", q: "What probabilistic assumption justifies least-squares regression?",
    a: "Assume y⁽ⁱ⁾ = θᵀx⁽ⁱ⁾ + ε⁽ⁱ⁾ with ε⁽ⁱ⁾ ~ N(0, σ²). Maximum likelihood estimation of θ then yields the least-squares cost function." },

  { cat: "sl", q: "What is locally weighted regression (LWR)?",
    a: "A non-parametric method that fits a separate linear model for each query point x, weighting training examples by w⁽ⁱ⁾ = exp(−(x⁽ⁱ⁾ − x)² / 2τ²). Bandwidth τ controls the local neighborhood size." },

  { cat: "sl", q: "What is the sigmoid (logistic) function and its derivative?",
    a: "g(z) = 1 / (1 + e⁻ᶻ). Derivative: g′(z) = g(z)(1 − g(z)). Maps any real number to (0, 1)." },

  { cat: "sl", q: "What is the logistic regression hypothesis?",
    a: "hθ(x) = g(θᵀx) = 1 / (1 + e^(−θᵀx)). Outputs the probability P(y=1 | x; θ) for binary classification." },

  { cat: "sl", q: "What is the classification margin and why does it matter?",
    a: "Margin = y · xᵀθ. Positive → correct prediction; larger value = higher confidence. Loss functions (logistic, hinge, exponential) all penalize negative margins and reward positive ones." },

  { cat: "sl", q: "What are three common loss functions for binary classification?",
    a: "Logistic: log(1 + e⁻ᶻ)  |  Hinge: max{1 − z, 0}  |  Exponential: e⁻ᶻ. All are convex surrogates for 0/1 loss." },

  { cat: "sl", q: "What is Newton's method for MLE, and why is it faster than gradient descent?",
    a: "θ := θ − H⁻¹ ∇θ ℓ(θ), using the Hessian H. Converges quadratically (doubles correct digits per step) vs. linear convergence for GD. Called Fisher scoring for logistic regression." },

  { cat: "sl", q: "What is the perceptron update rule?",
    a: "When sign(θᵀx) ≠ y: θ := θ + yx. Only fires on misclassification; uses threshold activation g(z) = +1 if z ≥ 0, −1 if z < 0." },

  { cat: "sl", q: "What does the Perceptron Convergence Theorem guarantee?",
    a: "If data are linearly separable with margin γ (via unit vector u) and max example norm D, the number of mistakes is at most (D/γ)². The perceptron will converge in finite steps." },

  { cat: "sl", q: "What is the exponential family form of a distribution?",
    a: "p(y; η) = b(y) exp(ηᵀT(y) − a(η)), where η is the natural parameter, T(y) the sufficient statistic, and a(η) the log-partition function." },

  { cat: "sl", q: "What are the three assumptions defining a Generalized Linear Model (GLM)?",
    a: "(1) y | x; θ follows an exponential family distribution. (2) The hypothesis is h(x) = E[T(y) | x]. (3) The natural parameter η = θᵀx." },

  { cat: "sl", q: "What is softmax regression and when is it used?",
    a: "Multiclass generalization of logistic regression. Output probabilities: φᵢ = e^(ηᵢ) / Σⱼ e^(ηⱼ). Arises from the multinomial distribution in the GLM framework." },

  // ── 2. Generative Learning ────────────────────────────────────────────────

  { cat: "gen", q: "What is the difference between discriminative and generative algorithms?",
    a: "Discriminative: model p(y | x) directly. Generative: model p(x | y) and p(y), then use Bayes' rule to compute p(y | x) = p(x | y)p(y) / p(x)." },

  { cat: "gen", q: "What is Gaussian Discriminant Analysis (GDA)?",
    a: "Models p(x | y=k) as a multivariate Gaussian with class-specific mean μₖ but shared covariance Σ. MLE yields a linear decision boundary; the posterior p(y | x) takes the logistic form." },

  { cat: "gen", q: "Write the multivariate Gaussian density.",
    a: "p(x; μ, Σ) = 1 / ((2π)^(d/2)|Σ|^(1/2)) · exp(−½(x − μ)ᵀΣ⁻¹(x − μ))" },

  { cat: "gen", q: "When should you prefer GDA over logistic regression?",
    a: "GDA is more efficient when Gaussian class-conditional assumptions are correct. Logistic regression is more robust when they're wrong (it makes fewer assumptions). Both fit the same linear decision boundary." },

  { cat: "gen", q: "What is the Naive Bayes assumption?",
    a: "Features xᵢ are conditionally independent given the class y: p(x | y) = Πᵢ p(xᵢ | y). Reduces parameters from exponential (2^d) to linear (d), making high-dimensional problems tractable." },

  { cat: "gen", q: "What is Laplace smoothing and what problem does it solve?",
    a: "Replaces MLE φⱼ = count(j)/n with φⱼ = (1 + count(j)) / (k + n). Prevents zero probabilities for unseen feature values, which would cause predictions to collapse in Naive Bayes." },

  { cat: "gen", q: "What are event models in Naive Bayes for text?",
    a: "Multivariate Bernoulli: one feature per word, indicating presence/absence. Multinomial: one feature per word position, modeling word frequencies. Multinomial is more commonly used for text classification." },

  // ── 3. Kernels & SVMs ──────────────────────────────────────────────────────

  { cat: "svm", q: "What is a feature map and how does it relate to a kernel?",
    a: "φ(x) maps inputs to a higher-dimensional feature space. The corresponding kernel is K(x, z) = φ(x)ᵀφ(z). We can compute K efficiently without ever computing φ explicitly." },

  { cat: "svm", q: "What is the kernel trick?",
    a: "Replace every inner product ⟨x, z⟩ in an algorithm with K(x, z). This lets algorithms operate in high (or infinite) dimensional feature spaces at the cost of only computing kernel evaluations." },

  { cat: "svm", q: "What is the difference between functional and geometric margin?",
    a: "Functional: γ̂⁽ⁱ⁾ = y⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b). Geometric: γ⁽ⁱ⁾ = y⁽ⁱ⁾((w/||w||)ᵀx⁽ⁱ⁾ + b/||w||). Functional margin is scale-dependent; geometric margin is the true Euclidean distance to the decision boundary." },

  { cat: "svm", q: "What is the SVM primal optimization problem?",
    a: "min_{w,b} ½||w||² subject to y⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b) ≥ 1 for all i. Maximizing the geometric margin is equivalent to minimizing ||w||² with functional margin constraints set to 1." },

  { cat: "svm", q: "What is Lagrange duality and why does it matter for SVMs?",
    a: "Converts a constrained primal problem into a dual by introducing Lagrange multipliers α. For convex problems with Slater's condition, p* = d* (strong duality). The SVM dual is expressed in terms of kernel evaluations — enabling the kernel trick." },

  { cat: "svm", q: "What is the KKT complementarity condition and its implication for SVMs?",
    a: "αᵢ > 0 ⟹ y⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b) = 1. Most αᵢ = 0; only support vectors (on the margin boundary) have αᵢ > 0. Predictions depend only on these few support vectors." },

  { cat: "svm", q: "What is the SVM dual problem?",
    a: "max_α Σᵢ αᵢ − ½ Σᵢ,ⱼ y⁽ⁱ⁾y⁽ʲ⁾αᵢαⱼ⟨x⁽ⁱ⁾, x⁽ʲ⁾⟩ subject to αᵢ ≥ 0. After solving, w = Σᵢ αᵢy⁽ⁱ⁾x⁽ⁱ⁾. Replace ⟨x⁽ⁱ⁾, x⁽ʲ⁾⟩ with K(x⁽ⁱ⁾, x⁽ʲ⁾) to use kernels." },

  { cat: "svm", q: "What is the Gaussian (RBF) kernel?",
    a: "K(x, z) = exp(−||x − z||² / 2τ²). Corresponds to an infinite-dimensional feature space. Bandwidth τ: small → very local decision boundary; large → nearly linear." },

  { cat: "svm", q: "What is the representer theorem?",
    a: "Any minimizer of J_λ(θ) = (1/m)Σ L(θᵀx⁽ⁱ⁾, y⁽ⁱ⁾) + (λ/2)||θ||² can be written as θ = Σᵢ αᵢx⁽ⁱ⁾. This justifies optimizing over α in kernel methods instead of high-dimensional θ." },

  { cat: "svm", q: "What is the hinge loss?",
    a: "L(z, y) = max{0, 1 − yz}. Zero when the prediction has margin ≥ 1; increases linearly otherwise. Encourages both correctness and a confident margin, giving SVMs robustness." },

  { cat: "svm", q: "What is the SMO algorithm?",
    a: "Sequential Minimal Optimization solves the SVM dual by iteratively picking two multipliers αᵢ, αⱼ, optimizing them jointly (a constrained 1D quadratic), and repeating. Efficient because the two-variable sub-problem has an analytic solution." },

  // ── 4. Decision Trees & Ensembles ─────────────────────────────────────────

  { cat: "dt", q: "Why are decision trees non-linear?",
    a: "They partition input space recursively — each leaf produces a prediction for a region, not a global linear function. No feature map φ(x) is needed to achieve non-linearity." },

  { cat: "dt", q: "What split criterion is used for classification trees, and why not misclassification error?",
    a: "Cross-entropy: L = −Σc p̂c log₂ p̂c. It is strictly concave, guaranteeing that any pure split reduces parent loss. Misclassification error is not strictly concave, allowing splits that don't improve it." },

  { cat: "dt", q: "What split criterion is used for regression trees?",
    a: "Squared loss: L(R) = (1/|R|) Σᵢ∈R (yᵢ − ȳ)², where ȳ is the mean of values in region R. Each leaf predicts the mean of its training targets." },

  { cat: "dt", q: "What are decision stumps and why are they ideal for boosting?",
    a: "Single-split trees (depth-1). High bias, very low variance — weak learners. Boosting combines many stumps additively, progressively reducing bias while keeping variance low." },

  { cat: "dt", q: "What is the ensemble variance formula, and what does it imply?",
    a: "Var(X̄) = ρσ² + ((1−ρ)/n)σ². Increasing n (more models) or decreasing ρ (less correlated models) both reduce ensemble variance. Bagging targets ρ; more data targets σ²." },

  { cat: "dt", q: "What is bagging (Bootstrap Aggregation)?",
    a: "Train each model on a different bootstrap sample (sample n examples with replacement). Reduces correlation ρ between models, lowering ensemble variance. Predictions are averaged (regression) or majority-voted (classification)." },

  { cat: "dt", q: "What is out-of-bag (OOB) error?",
    a: "Each bootstrap sample uses ~63% of data. The remaining ~37% can validate that model for free — no separate validation set needed. OOB error approximates leave-one-out cross-validation in the limit." },

  { cat: "dt", q: "What is the key difference between bagging and boosting?",
    a: "Bagging: variance reduction — models trained in parallel on different data subsets. Boosting: bias reduction — models trained sequentially, reweighting examples to focus on previously misclassified ones." },

  { cat: "dt", q: "How does AdaBoost weight examples and learners?",
    a: "Start with uniform weights. After round m: up-weight misclassified examples. Learner weight: αₘ = log((1 − errₘ) / errₘ). Final prediction: sign(Σₘ αₘGₘ(x))." },

  { cat: "dt", q: "What is Forward Stagewise Additive Modeling (FSAM)?",
    a: "At each step m, find βₘ, γₘ to minimize Σᵢ L(yᵢ, fₘ₋₁(xᵢ) + β G(xᵢ; γ)), then set fₘ = fₘ₋₁ + βₘG(·; γₘ). AdaBoost is FSAM with exponential loss." },

  { cat: "dt", q: "How does gradient boosting work?",
    a: "Compute pseudo-residuals gᵢ = −∂L(yᵢ, f(xᵢ))/∂f(xᵢ), then fit a regression tree to these gradients as the weak learner. Avoids the hard combinatorial search in FSAM." },

  // ── 5. Unsupervised Learning ───────────────────────────────────────────────

  { cat: "un", q: "What are the two steps of the k-means algorithm?",
    a: "Assignment: c⁽ⁱ⁾ := argmin_j ||x⁽ⁱ⁾ − μⱼ||². Update: μⱼ := mean of all x⁽ⁱ⁾ with c⁽ⁱ⁾ = j. Monotonically decreases distortion J = Σᵢ ||x⁽ⁱ⁾ − μ_{c⁽ⁱ⁾}||²." },

  { cat: "un", q: "What is the distortion function J in k-means and what does convergence mean?",
    a: "J(c, μ) = Σᵢ ||x⁽ⁱ⁾ − μ_{c⁽ⁱ⁾}||². Both steps decrease J, so the algorithm converges — but to a local, not global, minimum. Run multiple random restarts to mitigate this." },

  { cat: "un", q: "What is the Mixture of Gaussians model?",
    a: "x⁽ⁱ⁾ ~ Σⱼ φⱼ N(μⱼ, Σⱼ), where latent z⁽ⁱ⁾ ∈ {1..k} indicates the component. Soft k-means: instead of hard assignments, compute posterior probabilities wⱼ⁽ⁱ⁾ = p(z⁽ⁱ⁾=j | x⁽ⁱ⁾)." },

  { cat: "un", q: "What are latent variables and why do they complicate MLE?",
    a: "Latent (hidden) variables z are unobserved. Marginalizing them out gives ℓ(θ) = Σᵢ log Σⱼ p(x⁽ⁱ⁾, z⁽ⁱ⁾=j; θ), a non-concave function that cannot be maximized in closed form." },

  { cat: "un", q: "What is Jensen's inequality?",
    a: "For a convex function f: E[f(X)] ≥ f(E[X]). For concave f, inequality reverses: E[f(X)] ≤ f(E[X]). Equality iff X is constant a.s. Fundamental to deriving the EM lower bound." },

  { cat: "un", q: "What is the ELBO and how does it lower-bound the log-likelihood?",
    a: "ELBO(x; Q, θ) = Σz Q(z) log[p(x,z;θ)/Q(z)]. By Jensen's inequality on the concave log function: log p(x;θ) ≥ ELBO. Equality holds when Q(z) = p(z|x;θ)." },

  { cat: "un", q: "What are the E-step and M-step of the EM algorithm?",
    a: "E-step: set Q(z) = p(z | x; θ_old) — compute posterior over latents (tightens the ELBO). M-step: θ_new = argmax_θ ELBO — maximize the lower bound over parameters. Repeat until convergence." },

  { cat: "un", q: "What is the EM algorithm guaranteed to do?",
    a: "Monotonically increase (or maintain) the log-likelihood ℓ(θ) at each iteration. Converges to a local maximum, not necessarily the global maximum." },

  { cat: "un", q: "What problem does Factor Analysis address?",
    a: "When d >> n, the sample covariance is singular. Factor Analysis models x = μ + Λz + ε, where z ∈ ℝᵏ (k << d) are latent factors and ε ~ N(0, Ψ) (diagonal). Captures correlations with far fewer parameters." },

  { cat: "un", q: "What is the loading matrix Λ in Factor Analysis?",
    a: "Λ ∈ ℝ^(d×k) maps the k latent factors z to observed dimensions. Each column of Λ is a 'factor direction'; the outer product ΛΛᵀ models shared variance while Ψ models independent noise per dimension." },

  { cat: "un", q: "What is ICA and when does it work?",
    a: "Independent Component Analysis recovers independent source signals s from mixtures x = As by finding unmixing W = A⁻¹. Works only when sources are non-Gaussian; Gaussian sources have a rotational ambiguity making recovery impossible." },

  { cat: "un", q: "What are the two fundamental ambiguities in ICA?",
    a: "Permutation ambiguity (source order unknown) and scaling ambiguity (magnitudes unknown). For non-Gaussian sources, these are the only ambiguities — the mixing matrix is otherwise identifiable." },

  { cat: "un", q: "What is PCA and what does it compute?",
    a: "Principal Component Analysis finds the orthogonal directions of maximum variance. Projecting onto the top k eigenvectors of the covariance Σ = (1/n)Σᵢ x⁽ⁱ⁾x⁽ⁱ⁾ᵀ minimizes reconstruction error." },

  { cat: "un", q: "Why must data be normalized before PCA?",
    a: "Features on different scales dominate variance. Normalize via xⱼ ← (xⱼ − μⱼ)/σⱼ so each feature contributes equally. Without this, PCA is dominated by the highest-magnitude feature." },

  // ── 6. Deep Learning ──────────────────────────────────────────────────────

  { cat: "dl", q: "Why can't you use only linear activation functions in a neural network?",
    a: "Compositions of linear functions are linear. Without non-linearity, a deep network collapses to a single affine transformation — no more expressive than linear regression." },

  { cat: "dl", q: "What is the ReLU activation function?",
    a: "f(z) = max(0, z). Cheap to compute, avoids vanishing gradients for positive activations, and produces sparse activations. Most common default choice for hidden layers." },

  { cat: "dl", q: "What is backpropagation?",
    a: "Efficient computation of gradients via the chain rule, propagating deltas backward: δ[l] = (W[l+1]ᵀ δ[l+1]) ⊙ g′(z[l]). Weight gradients: ∇W[l]J = δ[l] a[l-1]ᵀ. Complexity is O(cost of forward pass)." },

  { cat: "dl", q: "What is the vanishing gradient problem and how is it addressed?",
    a: "Gradients shrink exponentially through deep layers (e.g., sigmoid saturates), making early layers learn very slowly. Solutions: ReLU activations, residual connections (skip layers), batch normalization, careful initialization." },

  { cat: "dl", q: "What is Xavier / He initialization?",
    a: "Scale initial weights as W ~ N(0, 2/(nᵢₙ + nₒᵤₜ)) (Xavier) or N(0, 2/nᵢₙ) (He, for ReLU). Keeps activation variance roughly constant across layers, preventing vanishing/exploding gradients at initialization." },

  { cat: "dl", q: "What is batch normalization?",
    a: "Normalize each layer's pre-activations to zero mean and unit variance over the mini-batch, then scale/shift: ẑ = (z − μ_B)/σ_B, output = γẑ + β. Stabilizes training, allows higher learning rates, mild regularizer." },

  { cat: "dl", q: "What is dropout?",
    a: "Randomly zero out a fraction p of neurons during each training forward pass. Prevents co-adaptation and acts as an ensemble of 2^n sub-networks. At test time, multiply all weights by (1 − p)." },

  { cat: "dl", q: "What is vectorization in neural network implementation?",
    a: "Replace per-example for-loops with matrix operations: Z[l] = W[l] A[l-1] + b[l] for the whole mini-batch at once. Exploits BLAS/GPU parallelism for orders-of-magnitude speedup." },

  // ── 7. ML Theory ──────────────────────────────────────────────────────────

  { cat: "th", q: "What is the bias-variance decomposition of test MSE?",
    a: "E[(y − ŷ)²] = σ² + Bias²(f̂) + Var(f̂). σ² is irreducible noise. Simple models: high bias, low variance (underfitting). Complex models: low bias, high variance (overfitting)." },

  { cat: "th", q: "What is the Hoeffding inequality?",
    a: "P(|φ − φ̂| > γ) ≤ 2 exp(−2γ²n). Bounds how much the empirical mean φ̂ can deviate from the true mean φ. Foundational for showing that training error approximates generalization error." },

  { cat: "th", q: "What is uniform convergence in learning theory?",
    a: "Holds when |ε(h) − ε̂(h)| ≤ γ for ALL h ∈ H simultaneously with high probability. With |H| = k hypotheses: P(∃h s.t. |ε − ε̂| > γ) ≤ 2k exp(−2γ²n)." },

  { cat: "th", q: "What is empirical risk minimization (ERM)?",
    a: "Choose ĥ = argmin_{h∈H} ε̂(h). Combined with uniform convergence, ERM guarantees ε(ĥ) ≤ min_{h∈H} ε(h) + 2γ with high probability — the selected hypothesis generalizes." },

  { cat: "th", q: "What is the VC dimension?",
    a: "The size of the largest set of points H can shatter (realize every possible binary labeling). Measures hypothesis class complexity independent of input distribution. Higher VC dim → more data needed to generalize." },

  { cat: "th", q: "What is k-fold cross-validation?",
    a: "Partition data into k disjoint folds. Train on k−1 folds, validate on the remaining fold. Repeat k times, average test errors. More data-efficient than a single holdout split; standard k = 5 or 10." },

  { cat: "th", q: "What is L2 (ridge) regularization?",
    a: "Add λ/2 ||θ||² to the loss. Shrinks weights toward zero, reduces overfitting. Gradient update: θ := (1 − αλ)θ − α ∇J. Equivalent to a Gaussian prior on θ in MAP estimation." },

  { cat: "th", q: "What is L1 (lasso) regularization and how does it differ from L2?",
    a: "Add λ||θ||₁ to the loss. Produces sparse solutions (many weights exactly zero) — useful for feature selection. L2 shrinks all weights proportionally; L1 drives small weights to zero." },

  { cat: "th", q: "What is error analysis and how does it guide model improvement?",
    a: "Manually inspect misclassified examples to identify systematic error patterns. Quantify the expected improvement from fixing each issue before investing engineering effort. Prioritize the biggest gains." },

  // ── 8. Reinforcement Learning ────────────────────────────────────────────

  { cat: "rl", q: "What is the Markov Decision Process (MDP) framework?",
    a: "Tuple (S, A, P_{sa}, γ, R). Agent takes action a ∈ A in state s ∈ S, transitions via P_{sa}(s′), receives reward R(s), discounts future rewards by γ. Goal: maximize E[Σₜ γᵗ R(sₜ)]." },

  { cat: "rl", q: "What is the Bellman equation for the optimal value function?",
    a: "V*(s) = R(s) + max_a γ Σ_{s′} P_{sa}(s′) V*(s′). The optimal value of a state equals the immediate reward plus the discounted optimal future value. Used in value iteration." },

  { cat: "rl", q: "What is value iteration?",
    a: "Initialize V(s) = 0. Repeatedly apply the Bellman backup: V(s) := R(s) + max_a γ Σ_{s′} P_{sa}(s′) V(s′). Converges to V* for finite MDPs; then extract π*(s) = argmax_a Σ_{s′} P_{sa}(s′) V*(s′)." },

  { cat: "rl", q: "What is policy iteration?",
    a: "Alternate between: (1) Policy evaluation — solve for V^π via the linear system. (2) Policy improvement — π(s) := argmax_a Σ_{s′} P_{sa}(s′) V^π(s′). Converges faster than value iteration in practice." },

  { cat: "rl", q: "What is the LQR problem setup?",
    a: "Linear dynamics: sₜ₊₁ = Asₜ + Baₜ + wₜ (wₜ Gaussian noise). Quadratic cost: Σₜ (sₜᵀUsₜ + aₜᵀWaₜ). The optimal policy is linear: a*ₜ = Lₜsₜ, independent of noise." },

  { cat: "rl", q: "What is the discrete Riccati equation in LQR?",
    a: "Φₜ = Aᵀ(Φₜ₊₁ − Φₜ₊₁B(BᵀΦₜ₊₁B − W)⁻¹BᵀΦₜ₊₁)A − U. Solved backward in time. The optimal gain Lₜ is derived from Φₜ; the optimal control law is a*ₜ = Lₜsₜ." },

  { cat: "rl", q: "What is Differential Dynamic Programming (DDP)?",
    a: "Handles non-linear dynamics by linearizing around a nominal trajectory, solving a sequence of time-local LQR problems, executing the improved policy, and repeating until convergence. Iterative LQR approximation." },

  { cat: "rl", q: "What is the Kalman filter and where does it appear in LQG?",
    a: "Maintains a Gaussian belief state (mean, covariance) over the hidden state. Predict: propagate through dynamics. Update: incorporate noisy observation y via Kalman gain K = ΣCᵀ(CΣCᵀ + Σy)⁻¹. LQG = LQR + Kalman filter." },

];
